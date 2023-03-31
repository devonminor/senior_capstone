import styles from '../styles/TeacherRoster.module.css';



export default function TeacherRoster() {
    return (
        <div className={`row ${styles.rosterContainer}`}>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Role</th>
                            <th scope='col'>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row">Najib Daoud</td>
                            <td>Student</td>
                            <td><a href="mailto:najib.daoud@tufts.edu">najib.daoud@tufts.edu</a></td>
                        </tr>
                        <tr>
                            <td scope="row">Devon Minor</td>
                            <td>Student</td>
                            <td><a href="mailto:devon.minor@tufts.edu">devon.minor@tufts.edu</a></td>
                        </tr>
                        <tr>
                            <td scope="row">Anesu Gavh</td>
                            <td>Student</td>
                            <td><a href="mailto:anesu.gavh@tufts.edu">anesu.gavh@tufts.edu</a></td>
                        </tr>
                        <tr>
                            <td scope="row">Evan Loconto</td>
                            <td>Student</td>
                            <td><a href="mailto:evan.loconto@tufts.edu">evan.loconto@tufts.edu</a></td>
                        </tr>
                        <tr>
                            <td scope="row">Steven Bell</td>
                            <td>Teacher</td>
                            <td><a href="mailto:steven.bell@tufts.edu">steven.bell@tufts.edu</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
    );
}
