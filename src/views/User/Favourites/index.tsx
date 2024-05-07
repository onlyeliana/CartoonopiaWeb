import * as React from 'react';
import '../assets/index.css'
import { Space, Table, Tag } from 'antd';
import { TableProps } from 'antd/lib';
import { characterProps } from '../../../types/alltype';
import FavouriteCom from './favouriteCom';
interface IAppProps {
}



export function Favourites(props: IAppProps) {

    return (
        <div>
            <div className="mini-header" style={{
                position: 'sticky',
                top: 0
            }} id="mini-header">
                <div className="nav-link">
                    <ul className="nav-link-ul">
                        <li className="nav-link-item">
                            <a className="link" href="/#/userprofile" id="nav-anime">profile</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/userfavourites" id="nav-game">favourites</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/usercontributions" id="nav-game">contributions</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/usercommunity" id="nav-live">community</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/user/userprofile" id="nav-live">return</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="shell">
                <header style={{
                    height: '500px'
                }}>
                    <div className="img"
                        style={{
                            background: `url(${require('../assets/4image.jpg')})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>

                    </div>
                </header>
                <div className="main" >
                    <main style={{
                        width: '100%'
                    }}>
                        <article
                            style={{
                                width: '90%'
                            }}>
                            <div className="favourite-part">
                                <h1>My favorite characters</h1>
                                {/* table 组件渲染 favourite列表 */}
                            </div>
                            <div className='characters-list'>
                                {/* 收藏夹内容动态渲染 */}
                                <FavouriteCom></FavouriteCom>
                            </div>

                        </article>
                    </main>

                </div>
            </div>
            <footer>
                <div className="footer"></div>
            </footer>

        </div >
    );
}
