import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function BrokerBanner() {
  return (
    <div className="relative max-w-[84rem]  rounded-lg bg-gradient-to-r from-teal-800 to-emerald-900  py-6 overflow-hidden container mx-auto w-full ">
      <div className="container-fluid mx-auto flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap px-4 lg:mx-16 ">
        <div className="flex -space-x-3">
          <Avatar className="border-2 border-white w-12 h-12">
            <AvatarImage
              src="/images/avatar/1.jpg"
              alt="Agent profile"
            />
          </Avatar>
          <Avatar className="border-2 border-white w-12 h-12">
            <AvatarImage
             src="/images/avatar/2.jpg"
              alt="Agent profile"
            />
          </Avatar>
          <Avatar className="border-2 border-white w-12 h-12">
            <AvatarImage
              src="/images/avatar/3.jpg"
              alt="Agent profile"
            />
          </Avatar>
          <Avatar className="border-2 border-white w-12 h-12">
            <AvatarImage
              src="/images/avatar/1.jpg"
              alt="Agent profile"
            />
          </Avatar>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-semibold text-white">Find a TruBroker™</h2>
            <Badge className="bg-primary  text-white">NEW</Badge>
          </div>
          <p className="text-white/90 text-sm mt-1">Find trusted agents awarded for their excellent performance</p>
        </div>

        <Button variant="secondary" className="whitespace-nowrap font-semibold bg-white text-black hover:bg-white/90">
          Find My Agent
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

