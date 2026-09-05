import { startGoogleLogin } from "@/const";
import { GOOGLE_SIGN_IN_LABEL } from "@shared/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className="size-[18px]">
      <path fill="#4285F4" d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.715v2.258h2.909c1.702-1.567 2.684-3.877 2.684-6.614Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.468-.806 5.956-2.181l-2.909-2.258c-.806.54-1.836.859-3.047.859-2.344 0-4.328-1.584-5.037-3.71H.957v2.332A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.963 10.71A5.42 5.42 0 0 1 3.681 9c0-.593.102-1.17.282-1.71V4.958H.957A9 9 0 0 0 0 9c0 1.452.347 2.827.957 4.042l3.006-2.332Z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.507.454 3.441 1.346l2.581-2.581C13.463.892 11.426 0 9 0A9 9 0 0 0 .957 4.958L3.963 7.29C4.672 5.164 6.656 3.58 9 3.58Z" />
    </svg>
  );
}

type GoogleSignInButtonProps = Omit<ComponentProps<typeof Button>, "children" | "onClick"> & {
  label?: string;
};

export function GoogleSignInButton({
  label = GOOGLE_SIGN_IN_LABEL,
  className,
  ...props
}: GoogleSignInButtonProps) {
  return (
    <Button
      type="button"
      className={cn("google-signin-button", className)}
      onClick={() => startGoogleLogin()}
      aria-label={label}
      {...props}
    >
      <GoogleMark />
      <span>{label}</span>
    </Button>
  );
}
