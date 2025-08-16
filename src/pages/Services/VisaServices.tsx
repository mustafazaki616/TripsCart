import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Globe, Clock, CheckCircle } from "lucide-react";

const VisaServices = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Visa Services</h1>
          <p className="text-lg text-muted-foreground">
            Simplify your visa application process with TripsCart's comprehensive visa assistance services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-yellow-500" />
                Global Visa Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Get visa assistance for destinations worldwide, including tourist, business, and transit visas for all major countries.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-500" />
                Document Assistance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Expert guidance on required documents, application forms, and supporting materials needed for your visa application.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-yellow-500" />
                Fast Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Expedited visa processing services available for urgent travel needs, with regular updates on application status.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-500" />
                Expert Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Professional review of your application before submission to minimize the risk of rejection and delays.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Comprehensive Visa Support</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              TripsCart's visa services team consists of experienced professionals who understand the complexities 
              of international travel documentation. We provide personalized assistance to ensure your visa 
              application meets all requirements and is submitted correctly.
            </p>
            <p>
              Our services include visa requirement checking, document preparation guidance, application form 
              assistance, appointment scheduling, and status tracking. We work with official consulates and 
              embassies to ensure legitimate and secure processing.
            </p>
            <p>
              Whether you need a single-entry tourist visa or a multiple-entry business visa, our team provides 
              clear guidance throughout the process, helping you avoid common mistakes that could delay or 
              jeopardize your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaServices;