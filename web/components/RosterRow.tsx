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
