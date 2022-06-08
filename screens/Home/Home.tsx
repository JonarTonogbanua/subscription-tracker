import { ReactNode } from "react";
import Widgets from "@components/Widgets";
import Subscriptions from "@components/Subscriptions";
import Container from "@components/Container";

const Home = () => {
  return <>
    <div className="min-h-screen w-screen relative">
      <div className="bg-secondary h-[180px] flex items-center">
        <Container className="text-white">
          <h5 className="text-[28px] h-full py-5">Subscription Tracker</h5>
        </Container>
      </div>
      <div>
        <Container className="flex flex-col gap-10">
          <div className="-mt-[50px]">
            <Widgets />
          </div>
          <div>
            <Subscriptions />
          </div>
        </Container>
      </div>
    </div>
  </>
}

export default Home;