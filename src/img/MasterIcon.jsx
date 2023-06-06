import PropTypes from 'prop-types';
import { Component } from 'react';

export default class MasterIcon extends Component {
  render() {
    const { color } = this.props;
    return (
      <svg width="60" height="40" viewBox="0 0 58 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.4297 44.0926V41.1616C10.4643 40.6629 10.2826 40.1735 9.93098 39.8182C9.5794 39.4628 9.09192 39.276 8.59291 39.3053C7.9353 39.2621 7.30634 39.5804 6.95153 40.1357C6.62804 39.5969 6.03571 39.2783 5.40784 39.3053C4.86116 39.2776 4.34073 39.5416 4.04002 39.9989V39.4225H3.02393V44.0926H4.04979V41.5231C4.00561 41.1997 4.10806 40.8735 4.32918 40.6335C4.55031 40.3935 4.86702 40.2647 5.1929 40.2823C5.86704 40.2823 6.209 40.7219 6.209 41.5133V44.1122H7.23486V41.5231C7.19249 41.2001 7.29557 40.875 7.51628 40.6354C7.73699 40.3958 8.05261 40.2665 8.37797 40.2823C9.07165 40.2823 9.40384 40.7219 9.40384 41.5133V44.1122L10.4297 44.0926ZM25.6076 39.4225H23.9369V38.0058H22.9111V39.4225H21.9829V40.3507H22.9306V42.5001C22.9306 43.5846 23.3507 44.2294 24.5525 44.2294C25.0014 44.2309 25.4417 44.1056 25.8226 43.8679L25.5295 42.9984C25.257 43.1609 24.9477 43.2517 24.6306 43.2622C24.1421 43.2622 23.9565 42.9495 23.9565 42.4806V40.3507H25.6174L25.6076 39.4225ZM34.2738 39.3053C33.7691 39.2904 33.2967 39.5528 33.0427 39.9892V39.4225H32.0364V44.0926H33.0525V41.4742C33.0525 40.7024 33.3847 40.2725 34.0295 40.2725C34.2468 40.2695 34.4626 40.3094 34.6646 40.3897L34.9772 39.4127C34.7452 39.3297 34.5007 39.2868 34.2542 39.2857L34.2738 39.3053ZM21.172 39.7938C20.5968 39.4518 19.9355 39.2822 19.2668 39.3053C18.0846 39.3053 17.3128 39.8719 17.3128 40.8001C17.3128 41.5622 17.8794 42.0311 18.9248 42.1777L19.4134 42.2461C19.9703 42.3242 20.234 42.4708 20.234 42.7346C20.234 43.0961 19.8628 43.3013 19.1691 43.3013C18.6111 43.3174 18.064 43.1453 17.6156 42.8127L17.1271 43.6041C17.719 44.0174 18.428 44.2297 19.1496 44.2099C20.4978 44.2099 21.2795 43.5748 21.2795 42.6857C21.2795 41.7966 20.6639 41.4352 19.6478 41.2886L19.1593 41.2202C18.7197 41.1616 18.368 41.0737 18.368 40.761C18.368 40.4484 18.7001 40.2139 19.257 40.2139C19.7718 40.2199 20.2764 40.3578 20.7226 40.6145L21.172 39.7938ZM48.3867 39.3053C47.8821 39.2904 47.4097 39.5528 47.1557 39.9892V39.4225H46.1494V44.0926H47.1655V41.4742C47.1655 40.7024 47.4977 40.2725 48.1425 40.2725C48.3598 40.2695 48.5756 40.3094 48.7775 40.3897L49.0902 39.4127C48.8581 39.3297 48.6137 39.2868 48.3672 39.2857L48.3867 39.3053ZM35.2947 41.7478C35.2703 42.4114 35.5266 43.0546 36.0008 43.5195C36.475 43.9844 37.1231 44.2279 37.7861 44.1903C38.3962 44.2214 38.9958 44.0227 39.4666 43.6334L38.9781 42.8127C38.6268 43.0806 38.1985 43.2279 37.7568 43.2329C36.978 43.1698 36.378 42.5194 36.378 41.738C36.378 40.9567 36.978 40.3062 37.7568 40.2432C38.1985 40.2481 38.6268 40.3955 38.9781 40.6633L39.4666 39.8426C38.9958 39.4534 38.3962 39.2547 37.7861 39.2857C37.1231 39.2481 36.475 39.4917 36.0008 39.9566C35.5266 40.4215 35.2703 41.0646 35.2947 41.7283V41.7478ZM44.8109 41.7478V39.4225H43.7948V39.9892C43.4447 39.5387 42.8993 39.2842 42.3292 39.3053C40.9803 39.3053 39.8867 40.3988 39.8867 41.7478C39.8867 43.0968 40.9803 44.1903 42.3292 44.1903C42.8993 44.2114 43.4447 43.9569 43.7948 43.5064V44.0731H44.8109V41.7478ZM41.0298 41.7478C41.075 40.9812 41.7247 40.3913 42.4921 40.4201C43.2595 40.4489 43.8632 41.0858 43.8508 41.8537C43.8384 42.6215 43.2144 43.2386 42.4465 43.2426C42.0555 43.2476 41.6801 43.089 41.4111 42.8051C41.1421 42.5213 41.0039 42.138 41.0298 41.7478ZM28.7683 39.3053C27.4193 39.3241 26.341 40.433 26.3599 41.782C26.3788 43.131 27.4877 44.2092 28.8367 44.1903C29.5395 44.2264 30.2307 44.0001 30.776 43.5553L30.2875 42.803C29.9018 43.1123 29.4239 43.2842 28.9295 43.2915C28.2311 43.3515 27.6118 42.8448 27.5324 42.1484H31.0008C31.0008 42.0214 31.0008 41.8943 31.0008 41.7576C31.0008 40.292 30.0921 39.315 28.7829 39.315L28.7683 39.3053ZM28.7683 40.2139C29.0754 40.2073 29.3724 40.3231 29.5942 40.5356C29.8159 40.7482 29.9441 41.0401 29.9505 41.3472H27.5079C27.5447 40.695 28.0958 40.1916 28.7487 40.2139H28.7683ZM54.2244 41.7576V37.5466H53.2474V39.9892C52.8973 39.5387 52.3519 39.2842 51.7819 39.3053C50.4329 39.3053 49.3393 40.3988 49.3393 41.7478C49.3393 43.0968 50.4329 44.1903 51.7819 44.1903C52.3519 44.2114 52.8973 43.9569 53.2474 43.5064V44.0731H54.2244V41.7576ZM55.9195 43.4136C55.983 43.4128 56.0461 43.4244 56.1052 43.4478C56.1613 43.4707 56.2126 43.5038 56.2566 43.5455C56.2995 43.5876 56.3343 43.6373 56.3592 43.6921C56.4092 43.8074 56.4092 43.9382 56.3592 44.0536C56.3343 44.1083 56.2995 44.158 56.2566 44.2001C56.2126 44.2418 56.1613 44.2749 56.1052 44.2978C56.0467 44.3236 55.9835 44.3369 55.9195 44.3369C55.7305 44.3355 55.5593 44.2251 55.4799 44.0536C55.4305 43.9381 55.4305 43.8075 55.4799 43.6921C55.5048 43.6373 55.5395 43.5876 55.5825 43.5455C55.6264 43.5038 55.6778 43.4707 55.7339 43.4478C55.7975 43.4225 55.8658 43.4108 55.9342 43.4136H55.9195ZM55.9195 44.2392C55.9683 44.2395 56.0166 44.2295 56.0612 44.2099C56.1032 44.1911 56.1413 44.1646 56.1736 44.1317C56.3002 43.9935 56.3002 43.7814 56.1736 43.6432C56.1414 43.6102 56.1033 43.5837 56.0612 43.565C56.0165 43.5456 55.9683 43.5356 55.9195 43.5357C55.8708 43.536 55.8227 43.546 55.7779 43.565C55.734 43.583 55.6941 43.6096 55.6606 43.6432C55.534 43.7814 55.534 43.9935 55.6606 44.1317C55.6942 44.1652 55.734 44.1918 55.7779 44.2099C55.8271 44.2311 55.8805 44.2411 55.9342 44.2392H55.9195ZM55.9488 43.6579C55.9944 43.6557 56.0394 43.6695 56.0759 43.6969C56.1062 43.7221 56.1226 43.7602 56.1198 43.7995C56.1212 43.8323 56.1088 43.8642 56.0856 43.8875C56.0573 43.9132 56.0212 43.9287 55.983 43.9314L56.1247 44.0926H56.0123L55.8804 43.9314H55.8365V44.0926H55.7437V43.6627L55.9488 43.6579ZM55.8414 43.7409V43.8581H55.9488C55.968 43.8639 55.9883 43.8639 56.0075 43.8581C56.0144 43.8443 56.0144 43.828 56.0075 43.8142C56.0144 43.8004 56.0144 43.784 56.0075 43.7702C55.9883 43.7645 55.968 43.7645 55.9488 43.7702L55.8414 43.7409ZM50.4678 41.7576C50.513 40.9909 51.1627 40.401 51.9301 40.4298C52.6975 40.4586 53.3011 41.0956 53.2887 41.8634C53.2763 42.6313 52.6524 43.2484 51.8845 43.2524C51.4934 43.2573 51.1181 43.0988 50.8491 42.8149C50.5801 42.5311 50.4419 42.1478 50.4678 41.7576ZM16.1599 41.7576V39.4225H15.1438V39.9892C14.7937 39.5387 14.2484 39.2842 13.6783 39.3053C12.3293 39.3053 11.2357 40.3988 11.2357 41.7478C11.2357 43.0968 12.3293 44.1903 13.6783 44.1903C14.2484 44.2114 14.7937 43.9569 15.1438 43.5064V44.0731H16.1599V41.7576ZM12.3788 41.7576C12.424 40.9909 13.0737 40.401 13.8411 40.4298C14.6086 40.4586 15.2122 41.0956 15.1998 41.8634C15.1874 42.6313 14.5635 43.2484 13.7955 43.2524C13.4028 43.2601 13.0249 43.1027 12.7537 42.8186C12.4825 42.5344 12.343 42.1495 12.3691 41.7576H12.3788Z" fill={ color } />
        <path d="M55.3041 28.7938V28.0319H55.5337V27.8743H54.9524V28.0319H55.2015V28.7938H55.3041ZM56.4326 28.7938V27.8743H56.2567L56.0515 28.5311L55.8464 27.8743H55.69V28.7938H55.8171V28.1042L56.0076 28.7019H56.1395L56.33 28.1042V28.8004L56.4326 28.7938Z" fill={ color } />
        <path d="M27.1381 31.9088C27.2769 32.025 27.4252 32.1413 27.5712 32.2552C24.7552 34.1132 21.3746 35.1929 17.7452 35.1929C7.9431 35.1953 0 27.3172 0 17.5976C0 7.8805 7.9431 0 17.7428 0C21.3746 0 24.7552 1.08206 27.564 2.93769C27.4204 3.0587 27.2769 3.17023 27.1692 3.29362C22.968 6.89336 20.5635 12.1114 20.5635 17.5976C20.5635 23.0815 22.9584 28.2995 27.1381 31.9088ZM39.6772 0C36.0406 0 32.6648 1.08206 29.856 2.93769C29.9996 3.0587 30.1431 3.17023 30.2508 3.29362C34.452 6.89336 36.8565 12.1114 36.8565 17.5976C36.8565 23.0791 34.4616 28.2924 30.2819 31.9088C30.1431 32.025 29.9948 32.1413 29.8488 32.2552C32.6648 34.1132 36.0406 35.1929 39.6748 35.1929C49.4769 35.1953 57.42 27.3172 57.42 17.5976C57.42 7.88287 49.4769 0 39.6772 0ZM28.71 3.77296C28.4803 3.95093 28.2578 4.1289 28.0401 4.3211C24.2982 7.54591 21.9368 12.2941 21.9368 17.5976C21.9368 22.9035 24.2982 27.6494 28.0401 30.8742C28.2554 31.064 28.4827 31.2491 28.71 31.4247C28.9397 31.2491 29.1622 31.064 29.3799 30.8742C33.1194 27.6494 35.4832 22.9035 35.4832 17.5976C35.4832 12.2941 33.1218 7.54591 29.3799 4.3211C29.1646 4.13127 28.9397 3.95093 28.71 3.77296Z" fill={ color } />
      </svg>
    );
  }
}

MasterIcon.propTypes = {
  color: PropTypes.string.isRequired,
};
