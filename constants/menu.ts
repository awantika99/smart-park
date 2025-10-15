export default Object.freeze([
        {
          menu: { name: 'Dashboard', icon: 'pajamas:dashboard', icon_color: 'green-500', link: '/dashboard' },
        },
        // {
        //   menu: { name: 'Marketing', icon: 'material-symbols:notifications', icon_color: 'red-500' },
        // },
      
        // {
        //   menu: { name: 'Agent Management', icon: 'material-symbols:account-circle', icon_color: 'green-500' },
        //   sub_menu: [
        //     {
        //       name: 'Agent',
        //       icon: 'ic:baseline-portrait',
        //       link: '/agent-management/agent',
        //       icon_color: 'red-500',
        //     },
        //     {
        //       name: 'Branch',
        //       icon: 'ic:baseline-portrait',
        //       link: '/agent-management/branch',
        //       icon_color: 'red-500',
        //     },
        //   ],
        // },
        {
          menu: { name: 'User Management', icon: 'material-symbols:account-circle', icon_color: 'green-500' },
          sub_menu: [
            {
              name: 'User Profile',
              icon: 'ic:baseline-portrait',
              link: '/user-management/userprofile',
              icon_color: 'red-500',
            },
            {
              name: 'User Role',
              icon: 'ic:baseline-portrait',
              link: '/user-management/userrole',
              icon_color: 'red-500',
            },
            
      
          ],
        },
        {
          menu: { name: 'Customer Management', icon: 'material-symbols:account-circle', icon_color: 'green-500' },
          sub_menu: [
            // {
            //   name: 'Beneficiary Management',
            //   icon: 'ic:baseline-circle',
            //   link: '/customer-management/beneficiary-management',
            //   icon_color: 'red-500',
            // },
            {
              name: 'Customer Registration',
              icon: 'ic:baseline-circle',
              link: '/customer-management/customer-registration',
              icon_color: 'red-500',
            },
            // {
            //   name: 'CustomerB2B Registration',
            //   icon: 'ic:baseline-circle',
            //   link: '/customer-management/customerb2b-registration',
            //   icon_color: 'red-500',
            // },
            // {
            //   name: 'Customer Profile',
            //   icon: 'ic:baseline-circle',
            //   link: '/customer-management/customer-profile',
            //   icon_color: 'red-500',
            // },
              // {
            //   name: 'Registration Checker',
            //   icon: 'ic:baseline-circle',
            //   link: '/customer-management/registration-checker',
            //   icon_color: 'red-500',
            // },
             // {
            //   name: 'Registration Maker',
            //   icon: 'ic:baseline-circle',
            //   link: '/customer-management/registration-maker',
            //   icon_color: 'red-500',
            // },
      
          ],
        },
      
      
      
      
      

])