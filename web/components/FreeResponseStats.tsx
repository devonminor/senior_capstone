import { useEffect } from 'react';

interface IFreeResponseStats {
    saq: any;
}

const FreeResponseStats = ({ saq }: IFreeResponseStats) => {
    useEffect(() => {
        console.log('saq', saq);
    }, []);

    return (
        <div>
            <hr></hr>
            <div className='card'>
                <ul className='list-group list-group-flush'>
                    {saq &&
                        saq.responses &&
                        saq.responses.length > 0 &&
                        saq.responses.map((response: any, i: number) => {
                            return (
                                <li className='list-group-item' key={i}>
                                    <h6>{response.email}</h6>
                                    {response.response}
                                </li>
                            );
                        })}
                    {(saq && !saq.responses) ||
                        (saq && saq.responses && saq.responses.length == 0 && (
                            <li className='list-group-item'>
                                No responses yet
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default FreeResponseStats;
