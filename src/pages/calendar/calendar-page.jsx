// This page displays the calendar (it's the home page)

import * as React from "react";
import SidebarModes from "../../data/sidebar-modes";
import UltraResponsiveCalendar from "ultra-responsive-calendar";
import CalendarHeader from './calendar-header.jsx';

export default class CalendarPage extends React.Component {

    componentDidMount() {
        this.props.setSidebarMode(SidebarModes.CALENDAR_VIEW);
        this.props.setPageTitlePrefix(null);

        // Load the visible labels from the URL (if defined)
        const labelsStr = this.props.match.params.labels;
        if (labelsStr && labelsStr.length > 0) {
            let labelsArr = labelsStr.split(',');
            let labels = this.props.labels.labelList;
            for (let labelName in labels) {
                labels[labelName].selected = labelName in labelsArr;
            }
            this.props.setVisibleLabels(labelsArr);
        }

        if (!this.props.currentlyViewingDate) {
            // Set the focused date on the calendar to today and load the events
            this.props.showToday();
        }
    }

    componentDidUpdate() {

        if (this.props.labels.visibleLabels) {
            let labelsStr = this.props.labels.visibleLabels
                                .sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase())) // sort alphabetically ignoring case
                                .join(',');
            let url = '/calendar/' + encodeURI(labelsStr);
            if (url !== this.props.location.pathname) {
                // Update URL to reflect selected labels
                this.props.setRoute(url);
            }
        }
    }

    render() {
        const currDate = this.props.currentlyViewingDate
            ? this.props.currentlyViewingDate.format('MMMM')
            : '';
        const header = <CalendarHeader
            title={currDate}
            onLeftClick={this.props.pageLeft}
            onRightClick={this.props.pageRight}
            onTodayClick={this.props.showToday}
        />;

        return (
            <div className="calendar-container">
                {/*<MenuIconButton onClick={this.props.toggleSidebarCollapsed} tooltip="Show/Hide Sidebar"/>*/}
                {/*<div style={{display: 'none'}}>{hackInsert}</div>*/}
                <UltraResponsiveCalendar
                    id="calendar"
                    className="page-container calendar-container"
                    numColumns={this.props.viewColumns}
                    viewType={this.props.viewMode}
                    header={header}
                    startDate={this.props.currentlyViewingDate}
                    onEventClick={this.props.viewEvent}
                    dayStartHour={9}
                    dayEndHour={24}
                    events={this.props.events}
                />
            </div>
        );
    }

}
