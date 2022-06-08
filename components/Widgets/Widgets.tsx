import Cards from "@components/Cards"

const WidgetTotalCost = () => {
  return <>
    <Cards>
      <h3 className="text-gray-400">Monthly Cost</h3>
      <div className="text-white text-[35px] font-bold">
        $300
      </div>
    </Cards>
  </>
}

const WidgetActiveSubscription = () => {
  return <>
    <Cards>
      <h3 className="text-gray-400">Active Subscription</h3>
      <div className="text-white text-[35px] font-bold">
        10
      </div>
    </Cards>
  </>
}

const WidgetExpiringSubscription = () => {
  return <>
    <Cards>
      <h3 className="text-gray-400">Expiring Subscription</h3>
      <div className="text-white text-[35px] font-bold">
        2
      </div>
    </Cards>
  </>
}

const WidgetExpiredSubscription = () => {
  return <>
    <Cards>
      <h3 className="text-gray-400">Expired Subscription</h3>
      <div className="text-white text-[35px] font-bold">
        1
      </div>
    </Cards>
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