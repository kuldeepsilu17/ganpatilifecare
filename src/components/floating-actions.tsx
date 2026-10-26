import { MessageCircle, Phone } from "lucide-react";
import { business } from "@/lib/site-data";

export function FloatingActions() {
  const message = encodeURIComponent("Hello Ganpati Lifecare, I would like to enquire about your medical supplies. Please share product availability and wholesale details.");
  return <aside className="floating-actions" aria-label="Quick contact"><a className="floating-whatsapp" href={`https://wa.me/${business.whatsapp}?text=${message}`} target="_blank" rel="noreferrer" aria-label="Chat with Ganpati Lifecare on WhatsApp"><MessageCircle size={21} /></a><a className="floating-call" href={`tel:${business.phoneRaw}`} aria-label={`Call Ganpati Lifecare at ${business.phone}`}><Phone size={19} /></a></aside>;
}
