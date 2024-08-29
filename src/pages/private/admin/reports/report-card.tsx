
function ReportCard({title, value, showCurrency= false} :{
    title:string;
    value:number;
    showCurrency?:boolean;
}) {
  return (
    <div className="border border-secondary border-solid rounded-sm p-5  flex flex-col gap-7">
        <h1 className="text-lg font-bold text-secondary">{title}</h1>
        <h1 className="text-5xl text-secondary font-bold text-center">
             {showCurrency && "$"}
            {value}
        </h1>
    </div>
  )
}

export default ReportCard