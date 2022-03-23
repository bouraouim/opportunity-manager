import React, { PureComponent } from 'react';
import '../../index';

class AreaTable extends React.Component {
    render() { 
        return(
            <div className="table-responsive">
                <table className="table align-items-center">
                    <thead className="table-primary">
                        <tr>
                            <th className="text-center text-xs font-weight-bold">Area</th>
                            <th className="text-center text-xs font-weight-bold">Business Unit</th>
                            <th className="text-center text-xs font-weight-bold">Status</th>
                            <th className="text-center text-xs font-weight-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="align-middle text-center text-sm"> 
                                <p className="text-xs font-weight-bold">North Africa</p>
                            </td>
                            <td className="align-middle text-center text-sm">
                                <p className="text-xs font-weight-bold">E&T</p>
                            </td>
                            <td className="align-middle text-center text-sm">
                                <span className="badge badge-sm badge-success">Active</span>
                            </td>
                            <td className="align-middle text-center">
                            <button type="button" className="btn btn-danger btn-circle btn-sm opacity-5">-</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default AreaTable;