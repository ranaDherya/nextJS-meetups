import Head from 'next/head';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage (props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);
    // useEffect(() => {
    //     // const response = fetch();
    //     // const data = response.json();

    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, [])
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name='description'
                content='Browse a huge list of highly active React Meetups' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://dherya:qCDpAYzq5WJvNdeL@cluster0.keqbyhu.mongodb.net/?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    //const data = result.json();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 10 //10 seconds
    };
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     //fetch data from an API

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;