import React, { PureComponent } from 'react';
import '../../index';

class BusinessUnitTable extends React.Component {
    render() { 
        return(
            <div class="table-responsive">
                <table class="table align-items-center">
                    <thead class="table-primary">
                        <tr>
                            <th class="text-center text-xs font-weight-bold">Business Unit</th>
                            <th class="text-center text-xs font-weight-bold">Status</th>
                            <th class="text-center text-xs font-weight-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold">Manager</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm badge-success">Active</span>
                            </td>
                            <td class="align-middle text-center">
                            <button type="button" class="btn btn-danger btn-circle btn-sm opacity-5">-</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default BusinessUnitTable;