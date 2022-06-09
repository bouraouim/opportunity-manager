import React from 'react';

function DateTable(props) {
    return (
        <div>
            <script src="../../assets/js/demo.min.js"></script>
            <div class="datepicker datepicker-dropdown dropdown-menu datepicker-orient-left datepicker-orient-top" style={{top: "575.7px", left: "476.6px", zIndex: "10", display: "block"}}>
            <div class="datepicker-days" style={{}}>
            <table class="table-condensed">
            <thead>
            <tr>
            <th colSpan="7" class="datepicker-title" style={{display: "none"}}>
            </th>
            </tr>
            <tr>
            <th class="prev">«</th>
            <th colSpan="5" class="datepicker-switch">May 2018</th>
            <th class="next">»</th>
            </tr><tr>
                <th class="dow">Su</th>
            <th class="dow">Mo</th><th class="dow">Tu</th>
            <th class="dow">We</th><th class="dow">Th</th>
            <th class="dow">Fr</th>
            <th class="dow">Sa</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td class="old day" data-date="1524960000000">29</td>
            <td class="old day" data-date="1525046400000">30</td>
            <td class="day" data-date="1525132800000">1</td>
            <td class="day" data-date="1525219200000">2</td>
            <td class="day" data-date="1525305600000">3</td>
            <td class="day" data-date="1525392000000">4</td>
            <td class="day" data-date="1525478400000">5</td></tr>
            <tr><td class="day" data-date="1525564800000">6</td>
            <td class="day" data-date="1525651200000">7</td>
            <td class="day" data-date="1525737600000">8</td>
            <td class="day" data-date="1525824000000">9</td>
            <td class="day" data-date="1525910400000">10</td>
            <td class="day" data-date="1525996800000">11</td>
            <td class="day" data-date="1526083200000">12</td>
            </tr><tr><td class="day" data-date="1526169600000">13</td>
            <td class="day" data-date="1526256000000">14</td>
            <td class="day" data-date="1526342400000">15</td>
            <td class="day" data-date="1526428800000">16</td>
            <td class="day" data-date="1526515200000">17</td>
            <td class="day" data-date="1526601600000">18</td>
            <td class="day" data-date="1526688000000">19</td>
            </tr><tr><td class="day" data-date="1526774400000">20</td>
            <td class="day" data-date="1526860800000">21</td>
            <td class="day" data-date="1526947200000">22</td>
            <td class="day" data-date="1527033600000">23</td>
            <td class="day" data-date="1527120000000">24</td>
            <td class="day" data-date="1527206400000">25</td>
            <td class="day" data-date="1527292800000">26</td>
            </tr><tr><td class="day" data-date="1527379200000">27</td>
            <td class="day" data-date="1527465600000">28</td>
            <td class="selected range-start day" data-date="1527552000000">29</td>
            <td class="range day" data-date="1527638400000">30</td>
            <td class="active selected range-end day" data-date="1527724800000">31</td>
            <td class="new day" data-date="1527811200000">1</td>
            <td class="new day" data-date="1527897600000">2</td></tr>
            <tr><td class="new day" data-date="1527984000000">3</td>
            <td class="new day" data-date="1528070400000">4</td>
            <td class="new day" data-date="1528156800000">5</td>
            <td class="new day" data-date="1528243200000">6</td>
            <td class="new day" data-date="1528329600000">7</td>
            <td class="new day" data-date="1528416000000">8</td>
            <td class="new day" data-date="1528502400000">9</td>
            </tr></tbody><tfoot><tr><th colSpan="7" class="today" style={{display: "none"}}>Today</th></tr>
            <tr><th colSpan="7" class="clear" style={{display: "none"}}>Clear</th>
            </tr>
            </tfoot>
            </table>
            </div>
            <div class="datepicker-months" style={{display: "none"}}>
            <table class="table-condensed">
            <thead>
            <tr>
            <th colSpan="7" class="datepicker-title" style={{display: "none"}}></th>
            </tr><tr><th class="prev">«</th><th colSpan="5" class="datepicker-switch">2018</th>
            <th class="next">»</th></tr></thead><tbody><tr><td colSpan="7">
            <span class="month">Jan</span><span class="month">Feb</span><span class="month">Mar</span>
            <span class="month">Apr</span><span class="month focused active">May</span>
            <span class="month">Jun</span><span class="month">Jul</span><span class="month">Aug</span>
            <span class="month">Sep</span><span class="month">Oct</span><span class="month">Nov</span>
            <span class="month">Dec</span></td></tr></tbody><tfoot><tr><th colSpan="7" class="today" style={{display: "none"}}>Today</th></tr><tr><th colSpan="7" class="clear" style={{display: "none"}}>Clear</th>
            </tr></tfoot></table></div><div class="datepicker-years" style={{display: "none"}}>
            <table class="table-condensed"><thead><tr><th colSpan="7" class="datepicker-title" style={{display: "none"}}>
            </th></tr><tr><th class="prev">«</th><th colSpan="5" class="datepicker-switch">2010-2019</th><th class="next">»</th>
            </tr></thead><tbody><tr><td colSpan="7">
            <span class="year old">2009</span><span class="year">2010</span><span class="year">2011</span><span class="year">2012</span><span class="year">2013</span><span class="year">2014</span><span class="year">2015</span><span class="year">2016</span><span class="year">2017</span><span class="year active focused">2018</span><span class="year">2019</span><span class="year new">2020</span></td></tr></tbody><tfoot><tr><th colSpan="7" class="today" style={{display: "none"}}>Today</th></tr><tr><th colSpan="7" class="clear" style={{display: "none"}}>Clear</th></tr></tfoot></table></div><div class="datepicker-decades" style={{display: "none"}}><table class="table-condensed"><thead><tr><th colSpan="7" class="datepicker-title" style={{display: "none"}}></th></tr><tr><th class="prev">«</th><th colSpan="5" class="datepicker-switch">2000-2090</th><th class="next">»</th></tr></thead><tbody><tr><td colSpan="7"><span class="decade old">1990</span><span class="decade">2000</span><span class="decade active focused">2010</span><span class="decade">2020</span><span class="decade">2030</span><span class="decade">2040</span><span class="decade">2050</span><span class="decade">2060</span><span class="decade">2070</span><span class="decade">2080</span><span class="decade">2090</span><span class="decade new">2100</span></td></tr></tbody><tfoot><tr><th colSpan="7" class="today" style={{display: "none"}}>Today</th></tr><tr><th colSpan="7" class="clear" style={{display: "none"}}>Clear</th></tr></tfoot></table></div><div class="datepicker-centuries" style={{display: "none"}}><table class="table-condensed"><thead><tr><th colSpan="7" class="datepicker-title" style={{display: "none"}}></th></tr><tr><th class="prev">«</th><th colSpan="5" class="datepicker-switch">2000-2900</th><th class="next">»</th></tr></thead><tbody><tr><td colSpan="7"><span class="century old">1900</span><span class="century active focused">2000</span><span class="century">2100</span><span class="century">2200</span><span class="century">2300</span><span class="century">2400</span><span class="century">2500</span><span class="century">2600</span><span class="century">2700</span><span class="century">2800</span><span class="century">2900</span><span class="century new">3000</span></td></tr></tbody><tfoot><tr><th colSpan="7" class="today" style={{display: "none"}}>Today</th></tr><tr><th colSpan="7" class="clear" style={{display: "none"}}>Clear</th></tr></tfoot></table></div></div>
        </div>
    );
}

export default DateTable;