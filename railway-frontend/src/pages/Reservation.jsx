import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Tabs from '../components/Tabs'
import TrainList from '../components/TrainList'
import SearchTrain from '../components/SearchTrain'
import BookTicket from '../components/BookTicket'
import TrackBooking from '../components/TrackBooking'
import MyBookings from '../components/MyBookings'

function Reservation() {
  const location = useLocation()
  const [active, setActive] = useState(location.state?.tab || 'search')

  return (
    <>
      <Header />
      <Tabs active={active} onChange={setActive} />
      <main className="content">
        {active === 'search' && (
          <SearchTrain
            initialSource={location.state?.prefillSource}
            initialDestination={location.state?.prefillDestination}
            autoSearch={location.state?.autoSearch}
          />
        )}
        {active === 'book' && <BookTicket />}
        {active === 'track' && <TrackBooking />}
        {active === 'mybookings' && <MyBookings />}
        {active === 'all' && <TrainList />}
      </main>
    </>
  )
}

export default Reservation