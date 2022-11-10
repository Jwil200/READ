import 'react-pro-sidebar/dist/css/styles.css';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

const FilterSidebar = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <View style={{ display: 'flex', height: '100%' }}>
      <ProSidebar>
        <SidebarHeader>
          {
           Dashboard}
        </SidebarHeader>
        <Menu iconShape="square">
          <MenuItem>Dashboard</MenuItem>
          <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
          <SubMenu title="Reports">
            <MenuItem>My Report</MenuItem>
            <MenuItem>MIS Report</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
      ;
    </View>
  );
}
export default FilterSidebar;