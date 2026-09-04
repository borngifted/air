import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Download, Hand, RefreshCw, ScanFace, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cameraFailureMessage, cameraIsAvailable, handTrackingMessage } from "@shared/camera";

const VISION_CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm";
const VISION_WASM = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const HAND_MODEL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

export type HandPosition = { x: number; y: number; visible: boolean };

export function CameraStudio({ conductor = false, onHandMove }: { conductor?: boolean; onHandMove?: (position: HandPosition) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const captureRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef(0);
  const landmarkerRef = useRef<any>(null);
  const [status, setStatus] = useState<"idle" | "requesting" | "live" | "captured" | "blocked">("idle");
  const [message, setMessage] = useState("Camera stays off until you choose to begin.");
  const [captureUrl, setCaptureUrl] = useState<string | null>(null);
  const [tracking, setTracking] = useState(false);

  const stopTracking = () => {
    setTracking(false);
    cancelAnimationFrame(frameRef.current);
    const canvas = overlayRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    onHandMove?.({ x: .5, y: .5, visible: false });
  };

  const stopCamera = () => {
    stopTracking();
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus("idle");
    setMessage("Camera is off. Nothing was uploaded.");
  };

  useEffect(() => () => {
    cancelAnimationFrame(frameRef.current);
    streamRef.current?.getTracks().forEach(track => track.stop());
    landmarkerRef.current?.close?.();
  }, []);

  async function startCamera() {
    if (!cameraIsAvailable(navigator.mediaDevices)) {
      setStatus("blocked");
      setMessage("This browser does not offer camera access. You can continue without it.");
      return;
    }
    setStatus("requesting");
    setMessage("Waiting for your camera choice…");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus("live");
      setMessage("Live on this device. Starting private hand tracking…");
      await startTracking(true);
    } catch (error) {
      setStatus("blocked");
      setMessage(cameraFailureMessage(error instanceof DOMException ? error.name : undefined));
    }
  }

  function capture() {
    const video = videoRef.current;
    const canvas = captureRef.current;
    if (!video || !canvas || !video.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.setTransform(1, 0, 0, 1, 0, 0);
    setCaptureUrl(canvas.toDataURL("image/png"));
    setStatus("captured");
    stopTracking();
    setMessage("Capture stays in this browser until you download it or retake it.");
  }

  function retake() {
    setCaptureUrl(null);
    setStatus(streamRef.current ? "live" : "idle");
    setMessage(streamRef.current ? "Live on this device. Nothing is uploaded." : "Camera stays off until you choose to begin.");
  }

  async function startTracking(force = false) {
    const video = videoRef.current;
    if (!video || (!force && status !== "live")) return;
    setMessage(handTrackingMessage("loading", conductor));
    try {
      if (!landmarkerRef.current) {
        const vision: any = await import(/* @vite-ignore */ VISION_CDN);
        const files = await vision.FilesetResolver.forVisionTasks(VISION_WASM);
        landmarkerRef.current = await vision.HandLandmarker.createFromOptions(files, { baseOptions: { modelAssetPath: HAND_MODEL, delegate: "GPU" }, runningMode: "VIDEO", numHands: 1 }).catch(() => vision.HandLandmarker.createFromOptions(files, { baseOptions: { modelAssetPath: HAND_MODEL, delegate: "CPU" }, runningMode: "VIDEO", numHands: 1 }));
      }
      setTracking(true);
      setMessage(handTrackingMessage("active", conductor));
      let lastTime = -1;
      const loop = (now: number) => {
        if (!videoRef.current || !landmarkerRef.current) return;
        const activeVideo = videoRef.current;
        const canvas = overlayRef.current;
        if (activeVideo.readyState >= 2 && activeVideo.currentTime !== lastTime) {
          lastTime = activeVideo.currentTime;
          const result = landmarkerRef.current.detectForVideo(activeVideo, now);
          const hand = result.landmarks?.[0];
          if (canvas) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            const context = canvas.getContext("2d");
            context?.clearRect(0, 0, canvas.width, canvas.height);
            if (hand && context) {
              context.fillStyle = "#d8ff45";
              [4, 8, 12, 16, 20].forEach(index => { const point = hand[index]; context.beginPath(); context.arc((1 - point.x) * canvas.width, point.y * canvas.height, 5, 0, Math.PI * 2); context.fill(); });
            }
          }
          if (hand) {
            const x = 1 - ((hand[0].x + hand[9].x) / 2);
            const y = (hand[0].y + hand[9].y) / 2;
            onHandMove?.({ x, y, visible: true });
          } else onHandMove?.({ x: .5, y: .5, visible: false });
        }
        frameRef.current = requestAnimationFrame(loop);
      };
      frameRef.current = requestAnimationFrame(loop);
    } catch {
      setTracking(false);
      setMessage(handTrackingMessage("unavailable", conductor));
    }
  }

  return <section className={`camera-studio ${conductor ? "conductor" : ""}`}>
    <div className="camera-frame">
      {captureUrl ? <img src={captureUrl} alt="Your private camera capture" /> : <video ref={videoRef} muted playsInline aria-label="Local camera preview" />}
      <canvas ref={overlayRef} className="camera-overlay" aria-hidden="true" />
      {status === "idle" && <div className="camera-empty"><Camera className="size-10" /><b>Camera off</b><span>You choose when it starts.</span></div>}
      {status === "requesting" && <div className="camera-empty"><ScanFace className="size-10 animate-pulse" /><b>Permission requested</b><span>Use your browser’s camera prompt.</span></div>}
      {status === "blocked" && <div className="camera-empty"><CameraOff className="size-10" /><b>Camera unavailable</b><span>{message}</span></div>}
      <div className="camera-live-pill"><i className={status === "live" ? "on" : ""} /> {status === "live" ? "Live on device" : status}</div>
    </div>
    <canvas ref={captureRef} hidden />
    <div className="camera-controls">
      {status === "idle" || status === "blocked" ? <Button className="air-button" onClick={startCamera}><Camera /> Enable camera + hands</Button> : status === "live" ? <><Button className="air-button" onClick={capture}><Camera /> Capture</Button><Button variant="outline" onClick={tracking ? stopTracking : () => startTracking()}><Hand /> {tracking ? "Hand tracking on" : "Start hand tracking"}</Button><Button variant="outline" onClick={stopCamera}><CameraOff /> Turn off</Button></> : <><Button className="air-button" onClick={retake}><RefreshCw /> Retake</Button>{captureUrl && <a href={captureUrl} download={`air-capture-${Date.now()}.png`}><Button variant="outline"><Download /> Download</Button></a>}<Button variant="outline" onClick={stopCamera}><CameraOff /> Close camera</Button></>}
    </div>
    <div className="camera-privacy"><ShieldCheck className="size-5 text-[var(--go)]" /><p><b>Your camera stays private.</b> The picture is used only on this device. AiR does not upload or save it.</p></div>
    <p className="camera-status" aria-live="polite">{message}</p>
  </section>;
}
