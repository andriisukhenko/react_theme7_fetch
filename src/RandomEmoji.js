import { useState, useEffect } from "react";
import './random-emoji.scss';

export default function RandomEmoji() {
    const [ emoji, setEmoji ] = useState(false),
        [ loader, setLoader ] = useState(true),
        loadEmoji = () => new Promise((resolve, reject) => {
            setLoader(true);
            fetch('https://emojihub.yurace.pro/api/random')
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    setEmoji(result.htmlCode[1] || result.htmlCode[0]);
                })
                .catch(e => console.log(e))
                .finally(() => setLoader(false));
        });

    useEffect(() => {
        if(!emoji) loadEmoji();
    }, [emoji]);


    const contentHtml = loader ? <div className="random-emoji--loader">Loading...</div> : <div dangerouslySetInnerHTML={{ __html: emoji }}></div>;
    
    return (
        <div className="random-emoji">
            <div className="random-emoji--content">
                {contentHtml}
            </div>
            <botton className="random-emoji--btn" 
                onClick={() => loadEmoji()}>generate emoji</botton>
        </div>
    );
}