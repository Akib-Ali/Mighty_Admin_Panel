"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, User, Calendar, Shield, Image, FileText, Eye } from "lucide-react"

const AgentDetailPage = () => {
  const agent = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+971-50-1234567",
    city: "Dubai",
    experience: "5 years",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    joinedDate: "2022-01-10",
    password: "********",
    emiratesIdNumber: "784-1987-1234567-1",
    emiratesIdFrontUrl: "https://www.edarabia.com/wp-content/uploads/2018/02/all-you-need-know-about-emirates-id.jpg",
    emiratesIdBackUrl: "https://media.assettype.com/gulfnews%2Fimport%2F2009%2F7%2F4%2F1_16a0826b4af.141022_2849104373_16a0826b4af_large.jpg",
    passportUrl: "https://as1.ftcdn.net/v2/jpg/06/43/88/76/1000_F_643887600_yIjle781ZFUq2r1RwwSstsx2EV0xFh9v.jpg",
    visaUrl: "https://as1.ftcdn.net/v2/jpg/06/43/88/76/1000_F_643887600_yIjle781ZFUq2r1RwwSstsx2EV0xFh9v.jpg",
    agencyId: "AG123456",
    reraCertificateUrl: "https://as1.ftcdn.net/v2/jpg/06/43/88/76/1000_F_643887600_yIjle781ZFUq2r1RwwSstsx2EV0xFh9v.jpg",
    preferredAreas: "Dubai Marina, JLT, Downtown",
  }

  return (
    <div className="w-full p-6">
      <Card className="w-full border border-primary rounded-2xl shadow-md">
        <CardContent className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={agent.profilePicture} alt={agent.name} />
              <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-semibold">{agent.name}</h2>
              <p className="text-muted-foreground">{agent.city}</p>
              <span className="text-sm text-primary">Joined on {agent.joinedDate}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Info label="Full Name" value={agent.name} icon={<User className="w-4 h-4 text-primary" />} />
            <Info label="Email" value={agent.email} icon={<Mail className="w-4 h-4 text-primary" />} />
            <Info label="Mobile Number" value={agent.phone} icon={<Phone className="w-4 h-4 text-primary" />} />
            <Info label="Password" value={agent.password} icon={<Shield className="w-4 h-4 text-primary" />} />
            <Info label="Emirates ID Number" value={agent.emiratesIdNumber} icon={<FileText className="w-4 h-4 text-primary" />} />
            <Info label="Years of Experience" value={agent.experience} icon={<Calendar className="w-4 h-4 text-primary" />} />
            <Info label="Agency ID" value={agent.agencyId} icon={<User className="w-4 h-4 text-primary" />} />
            <Info label="Preferred Areas" value={agent.preferredAreas} icon={<MapPin className="w-4 h-4 text-primary" />} />
            <Info label="City" value={agent.city} icon={<MapPin className="w-4 h-4 text-primary" />} />
          </div>

          {/* Document Images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Doc title="Emirates ID Front" url={agent.emiratesIdFrontUrl} />
            <Doc title="Emirates ID Back" url={agent.emiratesIdBackUrl} />
            <Doc title="Passport" url={agent.passportUrl} />
            <Doc title="Visa" url={agent.visaUrl} />
            <Doc title="RERA BRN Certificate" url={agent.reraCertificateUrl} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgentDetailPage

// Reusable info row
const Info = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="flex items-start gap-2">
    {icon}
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
)

// Reusable document preview
const Doc = ({ title, url }: { title: string; url: string }) => (
  <div className="flex flex-col items-start">
    <span className="text-sm text-muted-foreground mb-1">{title}</span>
    <img src={url} alt={title} className="w-full h-32 object-cover rounded-md border" />
  </div>
)

