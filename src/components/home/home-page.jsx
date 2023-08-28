import Link from "next/link";
import Image from "next/image";

export const HomePage = ({ data }) => (
  <div className="home_body">
    <div>
      <p>
        Welcome to All Event, your one-stop platform for discovering and
        managing exciting events. Our easy-to-use web app allows you to
        seamlessly browse, register for, and track upcoming events - whether
        it's a local meetup, a large conference, a community gathering, or an
        online webinar.
      </p>
      <p>
        Getting started is simple - just create a free account to unlock access
        to thousands of events across all categories and interests. Easily
        search or filter events by location, date, cost, and more to find the
        perfect events that match your preferences. View detailed event pages
        with descriptions, schedules, speaker bios, and organizer info to learn
        more before registering.
      </p>
      <button className="btn btn-primary">Register</button>
    </div>
    {data?.map((ev) => (
      <Link key={ev.id} href={`/events/${ev.id}`} passHref>
        <a className="card" href={`/events/${ev.id}`}>
          <div className="image">
            <Image width={600} height={400} alt={ev.title} src={ev.image} />
          </div>
          <div className="content">
            <h2> {ev.title} </h2>
            <p> {ev.description} </p>
          </div>
        </a>
      </Link>
    ))}
  </div>
);
