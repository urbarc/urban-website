import {Title, Subheading} from './typography';
import '../styles/components/construction.scss';
import Button from './button';


// https://forms.gle/c6KUMZ9wDvTvRyDKA
export default function Construction() {
    return (
        <div className="construction">
            <Title>Something New is Under Construction!</Title>
            <div className="divider" />
            <p>
                Currently our website is in open beta, which means we're still in the process of adding
                in-depth product information, our custom products, and other new website features! While
                we complete this process, please feel free to give us insight on your experience and how
                we can improve.
            </p>
            <a href="https://forms.gle/c6KUMZ9wDvTvRyDKA" target='_blank'>
                <Button>Send Feedback</Button>
            </a>
        </div>
    );
}