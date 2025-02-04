
import './App.css';
import { useEffect, useState } from 'react';
enum RowType {
  Header = "Header",
  Section = 'Section',
  Row = 'Row',
  SummaryRow = 'SummaryRow',
}
type Attributes = {
  Id: string
  Value: string
}
type Cells = {
  Value: string
  Attributes: Attributes[]
}
type Rows = {
  RowType: RowType
  Title?: string
  Rows?: Rows[]
  Cells?: Cells[]
}
export type BalanceSheet = {
  ReportDate: string
  ReportID: string
  ReportName: string
  ReportTitles: string[]
  ReportType: string[]
  UpdatedDateUTC: string
  Fields?: string[]
  Rows: Rows[]
}

function App() {
  const [reportData, setReportData] = useState<BalanceSheet | null>(null)
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    FetchData()
  }, []);

  const FetchData = async () => {

    try {
      const balanceSheetData = await fetch('http://localhost:3002/backend/balance-sheet');

      const result = await balanceSheetData.json();
      setReportData(result.Reports[0]);
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }


  if (loading) {
    return (<p>Loading</p>)
  }

  return (
    <div className="App container" test-id='balance-sheet-data' >
      <> {reportData && reportData.ReportTitles.map((title: string) => { return <div className='headings'>{title}</div> })}
        {reportData && reportData.Rows.map((tdata: Rows) => {
          return <table className='table-css' cellPadding="10">
            {tdata.RowType === RowType.Header ?
              (<thead>
                <tr>
                  {tdata.Cells && tdata.Cells.map((headers: Cells) => { return <th className='table-header'>{headers.Value}</th> })}
                </tr>
              </thead>)
              : (
                <tbody>
                  <div className={tdata.Rows && tdata.Rows.length === 0 ? 'sub-headings' : 'sub-sub-headings'}>{tdata.Title}  </div>
                  {tdata.Rows && tdata.Rows.map((rows: Rows) => {
                    return <tr className={rows.RowType === RowType.SummaryRow ? 'summary-row' : ''}>
                      {rows.Cells && rows.Cells.map((cols: Cells) => { return <td className='cells'>{cols.Value}</td> })}
                    </tr>
                  })}
                </tbody>
              )
            }
          </table>
        })}
      </>
    </div>
  );
}

export default App;
