import ButtonGroup from "./ButtonGroup";
import CalculationsCard from "./CalculationsCard";
import Chalan from "./Chalan";
import Payment from "./Payment";
import Production from "./Production";
import Load from "./Load";
import Unload from "./Unload";

const DashboardPage = () => {
  return (
    <div>
      <ButtonGroup />
      <CalculationsCard />

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-2 pt-5 ">
        <div className="lg:col-span-3">
          <Chalan />
        </div>
        <div className="lg:col-span-3">
          <Payment />
        </div>
        <div className="lg:col-span-2">
          <Production />
        </div>
        <div className="lg:col-span-2">
          <Load /> <Unload />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
