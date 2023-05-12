/*
 *  RosterRow.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  The RosterRow component displays the role of a user and their email
 *  address in a table row for a given class.
 *
 *  Last updated: 05/12/2023
 */

interface IRosterRow {
    role: string;
    email: string;
}

export const RosterRow = ({ role, email }: IRosterRow) => {
    return (
        <tr>
            <td>{role}</td>
            <td>
                <a href={`mailto:${email}`}>{email}</a>
            </td>
        </tr>
    );
};
