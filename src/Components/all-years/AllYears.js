import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import Tabs from 'nav-frontend-tabs';
import AllMonths from './AllMonths';

export default class AllYears extends React.Component {
  constructor({ monthsIncomeInformation }) {
    super();

    const yearBuckets = [[], [], [], []];
    for (let i = 0; i < monthsIncomeInformation.length; i += 1) {
      yearBuckets[(monthsIncomeInformation[i].month.split('-')[0])
      % 4].push(monthsIncomeInformation[i]);
    }
    const noEmptyYearBuckets = yearBuckets.filter(year => year.length > 0);
    noEmptyYearBuckets.sort((list1, list2) => ((list2[0]).month.split('-')[0] - (list1[0]).month.split('-')[0]));

    const tabs = noEmptyYearBuckets.map(monthIncomeInformation => ({
      label: monthIncomeInformation[0].month.split('-')[0],
      content: <AllMonths
        key={monthIncomeInformation[0].month.split('-')[0]}
        monthsIncomeInformation={monthIncomeInformation}
        year={monthIncomeInformation[0].month.split('-')[0]}
      />,
    }));

    this.onTabChange = this.onTabChange.bind(this);

    this.state = {
      tabs,
      currentTab: tabs[0].content,
    };
  }

  onTabChange(e, index) {
    this.setState(prevState => ({
      currentTab: { ...prevState.tabs[index].content },
    }));
  }

  render() {
    const { tabs, currentTab } = this.state;

    return (
      <div>
        <Innholdstittel>Årsoversikt</Innholdstittel>
        <Tabs
          kompakt={false}
          defaultAktiv={0}
          tabs={tabs.map(tab => ({
            label: tab.label,
          }))}
          onChange={this.onTabChange}
        />
        {currentTab}
      </div>
    );
  }
}

AllYears.propTypes = {
  monthsIncomeInformation: PropTypes.arrayOf(PropTypes.shape()),
};
