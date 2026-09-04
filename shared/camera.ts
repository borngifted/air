export function cameraIsAvailable(mediaDevices?: Pick<MediaDevices, "getUserMedia"> | null) {
  return typeof mediaDevices?.getUserMedia === "function";
}

export function cameraFailureMessage(errorName?: string) {
  if (errorName === "NotAllowedError" || errorName === "SecurityError") return "Camera access was not allowed. You can keep learning without it or change your browser settings.";
  if (errorName === "NotFoundError" || errorName === "DevicesNotFoundError") return "No camera was found on this device. You can keep learning without it.";
  return "The camera could not start. You can keep learning without it and try again later.";
}

export function handTrackingMessage(state: "loading" | "active" | "unavailable", conductor = false) {
  if (state === "loading") return "Getting private hand tracking ready on this device…";
  if (state === "unavailable") return "Hand tracking could not load. The camera, buttons, and keyboard still work.";
  return conductor
    ? "Hand tracking is active. Move your palm left or right to change the teaching step."
    : "Hand tracking is active on this device. Move your hand to see the tracking points.";
}
