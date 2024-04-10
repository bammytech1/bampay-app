import { useEffect } from "react";

// import { Link } from "react-router-dom";
// import { IoEyeOutline } from "react-icons/io5";
import { getTrades } from "../../redux/features/trade/tradeSlice";
import { useDispatch, useSelector } from "react-redux";

const TradeHistory = () => {
  const dispatch = useDispatch();
  const { trades, isLoading } = useSelector((state) => state.trade);
  console.log("trades:", trades);

  useEffect(() => {
    dispatch(getTrades()); // Fetch trades when component mounts
  }, [dispatch]);

  return (
    <section className="container text-dark w-full  h-96 rounded-3xl flex flex-col  md:justify-between  max-w-7xl ">
      <div className="overflow-x-scroll">
        <table className="table table-zebra z-0 table-pin-rows   w-full  ">
          {isLoading ? (
            <div className="flex  justify-center ">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
            </div>
          ) : (
            <>
              <thead className="bg-gray-50 ">
                <tr className="cursor-pointer ">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S/N
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trade ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trades &&
                  trades.map((trade, i) => (
                    <tr key={trade._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        {trade.createdAt}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {trade.giftType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {trade.tradeID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {trade.spend}
                        {trade.currency}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/trade-details/${trade._id}`}
                          title="View Trade Details"
                          className="hover:text-gray"
                        >
                          <IoEyeOutline
                            style={{ fontSize: "20px", color: "blue" }}
                          />
                        </Link>
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {trade.tradeStatus}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </section>
  );
};

export default TradeHistory;
