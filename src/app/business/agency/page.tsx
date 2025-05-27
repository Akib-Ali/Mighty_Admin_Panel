



'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Users, Eye, Mail, UserCheck, MapPin } from 'lucide-react';
import PerformanceChart from '@/components/bussiness-agent/PerformanceChart';
import LatestInquiries from '@/components/bussiness-agent/LatestInquiries';
import VisitAnalyticsChart from '@/components/business-agency/VisitAnalyticsChart';
import { LeadsTable } from '@/components/business-agency/LeadsTable';
import { RecentListing } from '@/components/business-agency/RecentListing';

export default function AgencyDashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Listings</CardTitle>
            <Home className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">120</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Agents</CardTitle>
            <Users className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">45</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Views This Month</CardTitle>
            <Eye className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">2,340</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Leads This Month</CardTitle>
            <Mail className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">78</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Agent and Active Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="hover:shadow-md">
          <CardHeader>
            <CardTitle>Top Performing Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <UserCheck className="text-primary w-8 h-8" />
              <div>
                <p className="font-medium">Ayesha Khan</p>
                <p className="text-sm text-gray-500">25 Deals Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md">
          <CardHeader>
            <CardTitle>Most Active Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <MapPin className="text-primary w-8 h-8" />
              <div>
                <p className="font-medium">Dubai</p>
                <p className="text-sm text-gray-500">65 Listings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <PerformanceChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Website Visit Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitAnalyticsChart />
          </CardContent>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentListing limit={5} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsTable limit={5} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



