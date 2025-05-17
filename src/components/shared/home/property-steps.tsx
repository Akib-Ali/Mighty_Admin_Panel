import { Camera, ClipboardList, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PropertySteps() {
  return (
    <div className="relative min-h-[400px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/simple-step-2-bg.png")',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10  max-w-6xl px-4 py-12 mx-auto">
        {/* Title */}
        <h1 className="text-xl   text-white md:text-2xl font-semibold flex items-center md:justify-center gap-2 uppercase mb-6">
          <span className=" ">
            <img
              src="/images/icons/heading-gold-left.png"
              alt="icon"
              className="w-6 h-6"
            />
          </span>
          Post Your property in 3  simple steps
          <span className="">
            <img
              src="/images/icons/heading-gold-right.png"
              alt="icon"
              className="w-6 h-6"
            />
          </span>
        </h1>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3 px-8">
          {/* Step 1 */}
          <Card className="group relative overflow-hidden border-2 border-yellow-500/50 bg-black/40 transition-all hover:border-yellow-500">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500 text-2xl font-bold text-white">
                01
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-yellow-500">
                  Add Details Of Your Property
                </h3>
                <p className="text-sm text-gray-300">
                  Begin By Telling Us The Few Basic Details About Your Property
                  Like Your Property Type, Location, No. Of Rooms Etc.
                </p>
              </div>
              <ClipboardList className="absolute bottom-4 right-4 h-16 w-16 text-yellow-500/10 transition-all group-hover:text-yellow-500/20" />
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="group relative overflow-hidden border-2 border-rose-500/50 bg-black/40 transition-all hover:border-rose-500">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-rose-500 text-2xl font-bold text-white">
                02
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-rose-500">
                  Upload Photos & Videos
                </h3>
                <p className="text-sm text-gray-300">
                  Upload Photos And Videos Of Your Property Either Via Your
                  Desktop Device Or From Your Mobile Phone.
                </p>
              </div>
              <Camera className="absolute bottom-4 right-4 h-16 w-16 text-rose-500/10 transition-all group-hover:text-rose-500/20" />
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="group relative overflow-hidden border-2 border-blue-500/50 bg-black/40 transition-all hover:border-blue-500">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 text-2xl font-bold text-white">
                03
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-500">
                  Add Pricing & Ownership
                </h3>
                <p className="text-sm text-gray-300">
                  Just Update Your Property's Ownership Details And Your
                  Expected Price And Your Property Is Ready For Posting Post
                  Property.
                </p>
              </div>
              <DollarSign className="absolute bottom-4 right-4 h-16 w-16 text-blue-500/10 transition-all group-hover:text-blue-500/20" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
