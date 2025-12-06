"use client"

import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  phoneNumber: string
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const handleClick = () => {
    const digits = phoneNumber.replace(/\D/g, "")
    const formatted =
      digits.startsWith("0") ? `254${digits.slice(1)}` :
      digits.startsWith("254") ? digits :
      `254${digits}`
    window.open(`https://wa.me/${formatted}`, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* caption */}
      <div className="hidden sm:inline-flex items-center">
        <span className="px-3 py-2 rounded-full bg-secondary text-secondary-foreground text-sm shadow-sm">
          Chat with us!
        </span>
      </div>

      {/* pulsating button */}
      <div className="relative">
        {/* pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/60 animate-ping" aria-hidden="true" />
        <Button
          onClick={handleClick}
          size="lg"
          aria-label="Chat with us on WhatsApp"
          className="relative rounded-full w-14 h-14 shadow-lg bg-[#25D366] hover:bg-[#20BA5A] text-white p-0 flex items-center justify-center"
        >
          {/* WhatsApp icon (inline SVG) */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
            <path d="M20.52 3.48A11.9 11.9 0 0 0 12 0C5.373 0 .001 5.372 0 12.001a11.92 11.92 0 0 0 1.67 6.07L0 24l6.03-1.6A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-11.999 0-3.19-1.244-6.18-3.48-8.52zM12 21.5c-1.52 0-3.01-.4-4.33-1.16l-.31-.18-3.57.95.95-3.48-.2-.36A9.44 9.44 0 0 1 2.5 12C2.5 6.85 6.85 2.5 12 2.5S21.5 6.85 21.5 12 17.15 21.5 12 21.5zM17.57 14.33c-.3-.15-1.77-.87-2.04-.97-.27-.1-.46-.14-.66.14-.2.28-.79.97-.97 1.17-.18.2-.36.22-.66.07-1.78-.89-2.95-1.6-4.13-3.54-.31-.48.31-.45.9-1.49.1-.2.05-.37-.02-.51-.07-.14-.66-1.58-.9-2.16-.24-.58-.49-.5-.66-.51l-.56-.01c-.19 0-.5.07-.76.37-.27.3-1.04 1.02-1.04 2.49 0 1.46 1.06 2.88 1.21 3.08.15.2 2.09 3.36 5.08 4.72 3 .1 3.18-1.1 3.55-1.22.37-.12 1.17-.48 1.33-.95.16-.47.16-.87.11-.95-.05-.08-.28-.14-.58-.29z" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
