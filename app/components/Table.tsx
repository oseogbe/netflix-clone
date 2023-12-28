import { CheckIcon } from "@heroicons/react/24/solid";
import { DocumentData } from "firebase/firestore"

interface Props {
    plans: DocumentData[];
    selectedPlan: DocumentData;
}

const Table = ({ plans, selectedPlan }: Props) => {
    return (
        <table>
            <tbody className="divide-y divide-[gray]">
                <tr className="tableRow">
                    <td className="tableDataTitle">Monthly price</td>
                    {
                        plans.map(plan => (
                            <td
                                className={`tableDataFeature ${selectedPlan.name == plan.name
                                    ? 'text-[#e50914]'
                                    : 'text-[gray]'
                                    }`}
                                key={plan.name}

                            >
                                NGN {plan.priceInfo.unit_amount! / 100}
                            </td>
                        ))
                    }
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">Video quality</td>
                    {
                        plans.map(plan => (
                            <td
                                className={`tableDataFeature ${selectedPlan.name == plan.name
                                    ? 'text-[#e50914]'
                                    : 'text-[gray]'
                                    }`}
                                key={plan.name}
                            >
                                {plan.metadata.videoQuality}
                            </td>
                        ))
                    }
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">Resolution</td>
                    {plans.map((plan) => (
                        <td
                            className={`tableDataFeature ${selectedPlan?.name === plan.name
                                ? 'text-[#E50914]'
                                : 'text-[gray]'
                                }`}
                            key={plan.name}
                        >
                            {plan.metadata.resolution}
                        </td>
                    ))}
                </tr>
                <tr className="tableRow">
                    <td className="tableDataTitle">
                        Watch on your TV, computer, mobile phone and tablet
                    </td>
                    {plans.map((plan) => (
                        <td
                            className={`tableDataFeature ${selectedPlan?.name === plan.name
                                ? 'text-[#E50914]'
                                : 'text-[gray]'
                                }`}
                            key={plan.name}
                        >
                            {plan.metadata.portability === 'true' && (
                                <CheckIcon className="inline-block h-8 w-8" />
                            )}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}

export default Table