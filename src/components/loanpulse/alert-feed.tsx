import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing, Check, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: 1,
    icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    text: "Warning: Leverage approaching 4.0x threshold.",
    time: "2h ago",
  },
  {
    id: 2,
    icon: <Check className="h-4 w-4 text-green-500" />,
    text: "Q3 Financials Received and Processed.",
    time: "1d ago",
  },
  {
    id: 3,
    icon: <Check className="h-4 w-4 text-green-500" />,
    text: "Covenant Compliance Certificate for Q2 approved.",
    time: "3mo ago",
  },
];

export function AlertFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 font-headline">
          <div className="flex items-center gap-2">
            <BellRing className="text-primary" />
            <span>Alert Feed</span>
          </div>
          <Badge variant="outline">Simulated</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex items-start gap-4">
              <div className="mt-1">{alert.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.text}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
