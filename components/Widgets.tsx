import { Card } from "@mantine/core"

const WidgetTotalCost = () => {
  return <>
    <Card className="w-full bg-accent rounded-lg">
      <h3 className="text-gray-400">Monthly Cost</h3>
      <div className="text-white text-[35px] font-bold">
        $300
      </div>
    </Card>
  </>
}

const WidgetActiveSubscription = () => {
  return <>
    <Card className="w-full bg-accent rounded-lg">
      <h3 className="text-gray-400">Active Subscription</h3>
      <div className="text-white text-[35px] font-bold">
        10
      </div>
    </Card>
  </>
}

const WidgetExpiringSubscription = () => {
  return <>
    <Card className="w-full bg-accent rounded-lg">
      <h3 className="text-gray-400">Expiring Subscription</h3>
      <div className="text-white text-[35px] font-bold">
        2
      </div>
    </Card>
  </>
}

const WidgetExpiredSubscription = () => {
  return <>
    <Card className="w-full bg-accent rounded-lg">
      <h3 className="text-gray-400">Expired Subscription</h3>
      <div className="text-white text-[35px] font-bold">
        1
      </div>
    </Card>
  </>
}

const Widgets = () => {
  return <>
  <div className="flex flex-row gap-5 justify-between">
    <WidgetTotalCost /> 
    <WidgetActiveSubscription /> 
    <WidgetExpiringSubscription /> 
    <WidgetExpiredSubscription /> 
  </div>
  </>
}

export default Widgets