"use client"
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import useRippleEffect from '../hooks/ripple';
import '../styles/components/card.scss';

export function CardSkeleton({type = "normal"}) {
    return (
        <div className={['card', type, "skeleton"].join(" ")}>
            <div className='image' />
            <div className='content'>
                <div className='metadata'>
                    <div className='name' />
                    <div className='category' />
                    <div className='price' />
                </div>
                <div className='uaid' />
            </div>
        </div>
    );
}

export default function Card({type = "normal", from, id, extension, name, subname, category, price}) {
    const [rippleExpand, rippleFade] = useRippleEffect();
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const timeout = setTimeout(async () => {
                setImage((await import("../images/unavailable.jpg")).default);
                setLoading(false);
            }, 5000);
            if(from === 'salvage')
                setImage((await import(`../images/${from}/${id}/${extension}/card.jpg`)).default);
            else
                setImage((await import(`../images/${from}/${id}/${extension}/card.jpg`)).default);
            clearTimeout(timeout);
            setLoading(false);
            
        })();
    }, [])

    const router = useRouter();
    return (loading?
        <CardSkeleton type={type} />
        :
        <div 
            className={['card', type].join(" ")} 
            onMouseDown={rippleExpand} onMouseUp={rippleFade}
            onClick={() => setTimeout(() => router.push(`/${from === 'products'? 'catalog' : 'salvage'}/${id}/${extension}`), 100)}
        >
            <div className='image'>
                <Image src={image} alt="" />
            </div>
            <div className='content'>
                <div className='metadata'>
                    <span className='name'>{name}{subname && subname !== ""? ` [${subname}]` : ''}</span>
                    <span className='category'>{category}</span>
                    <span className='price'>{price?.toString() === "Infinity"? "Call for pricing" : `${from === 'products'? "From " : ""}$${parseInt(price).toLocaleString('en', {useGrouping: true})}`}</span>
                </div>
                <span className='uaid'>{id}{extension && extension !== 'NONE'? `-${extension}` : ''}</span>
            </div>
        </div>
    );
}