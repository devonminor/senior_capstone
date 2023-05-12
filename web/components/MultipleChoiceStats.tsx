/*
 *  MultipleChoiceStats.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  The stasistics dropdown for multiple choice questions.
 *
 *  Last updated: 05/12/2023
 */

interface IMultipleChoiceStats {
    mcq: any;
}

const MultipleChoiceStats = ({ mcq }: IMultipleChoiceStats) => {
    return (
        <div>
            <hr></hr>

            <div>
                <div className='row'>
                    {mcq.options.map((option: any, i: number) => {
                        // count the number of students who chose this option
                        const students = mcq.responses.filter(
                            (response: any) => {
                                return response.order == option.order;
                            }
                        );

                        return (
                            <h3 className='lead' key={i}>
                                {option.name}:
                                <small className='text-muted'>
                                    {students.length > 0
                                        ? `[${students.map(
                                              (student: any, index: number) => {
                                                  // if this is the last student, don't add a comma
                                                  let lastStudent =
                                                      index ==
                                                      students.length - 1;
                                                  return `${student.email}${
                                                      lastStudent ? '' : ', '
                                                  }`;
                                              }
                                          )}]`
                                        : '[none]'}
                                </small>
                            </h3>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MultipleChoiceStats;
