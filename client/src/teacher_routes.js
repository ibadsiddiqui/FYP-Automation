import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Forms = Loadable({
  loader: () => import('./views/Base/Forms/Forms'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Teacher/Dashboard'),
  loading: Loading,
});

const Current_Projects = Loadable({
  loader: () => import('./views/Teacher/Current_Project'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('./views/Teacher/Profile'),
  loading: Loading,
});

const ProposalRequest = Loadable({
  loader: () => import('./views/Teacher/Proposal_Request'),
  loading: Loading,
})

const Projects = Loadable({
  loader: () => import('./views/Teacher/University_Projects'),
  loading: Loading,
});


const Sharing = Loadable({
  loader: () => import('./views/Teacher/Sharing'),
  loading: Loading,
});


const MeetingMinutes = Loadable({
  loader: () => import('./views/Teacher/Meeting_Minutes'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const teacher_routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/Profile', exact: true, name: 'Profile', component: Profile },
  { path: '/Sharing', exact: true, name: 'Sharing With Supervisor', component: Sharing },
  { path: '/Projects', exact: true, name: 'Over All Projects', component: Projects },
  { path: '/MeetingMinutes', exact: true, name: 'Templates For FYP', component: MeetingMinutes },
  { path: '/CurrentProjects', exact: true, name: 'Current Projects', component: Current_Projects },
  { path: '/ProposalRequest', name: 'Request', component: ProposalRequest },
  { path: '/base/forms', name: 'Forms', component: Forms },
  // { path: '/base/switches', name: 'Switches', component: Switches },
  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/base/tabs', name: 'Tabs', component: Tabs },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navbars', name: 'Navbars', component: Navbars },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  // { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  // { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
  // { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default teacher_routes;
