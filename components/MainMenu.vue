 
 <template>
  <div class="main_menu">
    <div class="li-menu" v-for="(item, index) in menuItems" :key="index">
      <a href="#" class="flex" @click.prevent="toggleMenu(item, $event)"> 
        <Icon id="close_menu"   :name="'material-symbols:'+item.icon" class="text-inherit max-w-[30px]" size="30px" :color="item.color"/> 
         
        <span>{{ item.name }}</span>
      </a>
      
        <div :class="[{'mega_menu': true, 'open-mega-menu': item.isActive}]">

        <div  class="amega_menu">
      
          <div class="mega-menu__header">
              <h5>Payment</h5>
            <Icon id="close_menu" @click="closeMenu"  name="material-symbols:close" class="text-inherit max-w-[30px]" size="30px" color="#fff"  />
          </div>
          <div class="mega-menu__search">
              <input type="text" class="bg-white input-primary mt-1 focus:border-gray-400 focus:ring-0" placeholder="Search Menu">
          </div>
           <ul class="menu__list">
                 <li>
                    <a>Search transaction </a>
                 </li>
                 <li>
                    <a>Screening</a>
                     </li>
                 <li>
                      </li>
                 <li>
                    <a>Do payment</a>
                     </li>
                 <li>
                    <a>Approve and decline</a>
                     </li>
                 <li>
                    <a>Transaction extraction and upload</a>
                        </li>
                 <li>
                    <a>Payout processing via UI code </a>
                        </li>
                 <li>
                    <a>Third parties interface</a>
                </li>
            </ul>
       
     
     </div>
      </div><!--end meega menu-->
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      menuItems: [
            { name: 'Dashboard', icon: 'home', color:'#00A389',isActivAe: false },
            // { name: 'Account Setup', icon: 'person',color:'#FFBB54', isActive: false },
            // { name: 'Configurations', icon: 'settings', color:'#ffffff',isActive: false },
            // { name: 'Payment', icon: 'attach-money',color:'#FF5B5B', isActive: false },
            // { name: 'Reports', icon: 'bar-chart', color:'#58CDFF',isActive: false },
        
         
        // Add more menu items here
      ],
    };
  },
  methods: {
    toggleMenu(selectedItem) {
      this.menuItems.forEach(item => {
        item.isActive = item === selectedItem ? !item.isActive : false;
      });

      if (this.menuItems.some(item => item.isActive)) {
        document.body.classList.add('menu-active');
      } else {
        document.body.classList.remove('menu-active');
      }
    },
    closeMenu() {
      this.menuItems.forEach(item => (item.isActive = false));
      document.body.classList.remove('menu-active');
    },
    handleClickOutside(event) {
      const clickedOnMenu = event.target.closest('.main_menu');
      const clickedOnCloseButton = event.target.closest('#close_menu');
      
      if (!clickedOnMenu && !clickedOnCloseButton) {
        this.closeMenu();
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>