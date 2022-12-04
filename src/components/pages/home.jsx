import BackgroundPng from "../../assets/background.png"
import Header from "../moduls/header"
import OrderList from "../moduls/order-list"

export default function Home() {
  return (
    <>
    <Header />
    <main className="after-nav pb5">
      <section className="pt2 mx10">
        <div className="heading flex jc-between ai-center">
          <article className="py3 px3 txt-white">
            <h1 className="bold fs3-25 bold">WAYSBUCKS</h1>
            <h4 className="mt1 fw300" style={{fontSize: "1.5em"}}>Things are changing, but we're still here for you</h4>
            <p className="mt1-5 fw300">We have temporarily closed our in-store cafes, but select
              <br />grocery and drive-thru locations remaining open.
              <br /><strong className="bold">Waysbucks</strong> Drivers is also available</p>
            <p className="mt2 fw300">Let's Order...</p>
          </article>
          <img src={BackgroundPng} alt="heading" />
        </div>
      </section>
      <OrderList />
    </main>
    </>
  )
}
