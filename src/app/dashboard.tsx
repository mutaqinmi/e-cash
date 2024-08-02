import CardInfo from "@/components/card-info";
import numberFormatter from "./number-formatter";
import SegmentedButton from "@/components/segmented-button";
import { useState } from "react";
import InputDate from "@/components/input-date";

export default function Dashboard(){
    const [period, setPeriod] = useState(3);
    return <>
        <div className="flex justify-between items-center">
            <div>
                <SegmentedButton label="6 bulan" active={period === 0 ? true : false} onClick={() => {setPeriod(0)}}/>
                <SegmentedButton label="1 bulan" active={period === 1 ? true : false} onClick={() => {setPeriod(1)}}/>
                <SegmentedButton label="7 hari" active={period === 2 ? true : false} onClick={() => {setPeriod(2)}}/>
                <SegmentedButton label="24 jam" active={period === 3 ? true : false} onClick={() => {setPeriod(3)}}/>
            </div>
            <InputDate/>
        </div>
        <div className="flex gap-6 mt-6">
            <CardInfo title="Laba Bersih" total={numberFormatter('300000')}/>
            <CardInfo title="Laba Kotor" total={numberFormatter('300000')}/>
            <CardInfo title="Total Kerugian" total={numberFormatter('300000')}/>
        </div>
    </>
}