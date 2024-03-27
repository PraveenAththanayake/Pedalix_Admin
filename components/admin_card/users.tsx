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
import Image from "next/image";

const Users = () => {
  const { users } = useFirebaseData();

  return (
    <CardWrapper headerLabel="Users" desc="All the logged users">
      <div className="flexCenter gap-5">
        {users.map((user) => (
          <Card key={user.email} className="w-[45vw]">
            <CardHeader>
              <Image
                src={user.imageUrl}
                alt={`${user.firstName} ${user.lastName}`}
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <CardTitle>
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription>Email: {user.email}</CardDescription>
              <CardDescription>
                Phone Number: {user.phoneNumber}
              </CardDescription>
              <CardDescription>NIC No: {user.nicNo}</CardDescription>
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

export default Users;
