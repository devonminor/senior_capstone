import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { API_URL } from '../lib/constants';

interface IFreeResponseStats {
    saq: any;
}

const FreeResponseStats = ({ saq }: IFreeResponseStats) => {
    const [clusters, setClusters] = useState<any>([]);

    const handleClustering = () => {
        if (!saq.responses) return;
        if (saq.response < 2) return;
        const responses = saq.responses.map(
            (response: any) => response.response
        );
        console.log('trying to handle clustering', responses);
        fetch(`${API_URL}/analyze_responses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ responses }),
        })
            .then((res) => res.json())
            .then((res) => {
                setClusters(res);
            });
    };

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
            <Button style={{ marginTop: '8px' }} onClick={handleClustering}>
                Run Clustering
            </Button>
            <div>
                {clusters && clusters.length > 0 && (
                    <div>
                        <h4 className='mt-2'>Clusters</h4>
                        {clusters.map((cluster: any, i: number) => {
                            // if the responses in this cluster match the response given by a user, add that user to the cluster
                            let usersInCluster: string[] = [];
                            for (let j = 0; j < cluster.length; j++) {
                                for (let k = 0; k < saq.responses.length; k++) {
                                    if (
                                        cluster[j] ==
                                            saq.responses[
                                                k
                                            ].response.toLowerCase() &&
                                        !usersInCluster.includes(
                                            saq.responses[k].email
                                        )
                                    ) {
                                        usersInCluster.push(
                                            saq.responses[k].email
                                        );
                                    }
                                }
                            }
                            return (
                                <div key={i}>
                                    <div>
                                        Cluster {i + 1} Responses:{' '}
                                        {cluster.join(', ')}
                                    </div>
                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        {usersInCluster.join(', ')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FreeResponseStats;
