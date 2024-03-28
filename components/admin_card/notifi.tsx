import useFirebaseData from "@/hooks/useFirebaseData";
import { CardWrapper } from "./card_wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Notify = () => {
  const { notifications } = useFirebaseData();

  return (
    <CardWrapper
      headerLabel="Notifications"
      desc="Notifications from end users"
    >
      <div className="flexCenter gap-5">
        {notifications.map((notify) => (
          <Card key={notify.email} className="w-[45vw]">
            <CardHeader>
              <CardTitle>{notify.email}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <CardDescription>Email: {notify.email}</CardDescription>

              <CardDescription>NIC No: {notify.message}</CardDescription>
            </CardContent>
            <CardFooter>
              {/* You can add some actions here if needed */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </CardWrapper>
  );
};

export default Notify;
