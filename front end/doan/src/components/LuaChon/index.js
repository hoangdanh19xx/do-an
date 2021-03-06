import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Order from '../Order';
import Logo from '../../images/logo.jpg';
import New from '../../images/new.png';




class LuaChon extends Component{
    constructor(props){
        super(props);
        this.state = {
            ten : '',
            isSV : false,
            isGV : false,
            o : false,
            op : false,
            ck : '',
          }
    }

    onClick = () => {
        this.setState({
            op : !this.state.op
        })
    }

    onClickSaveCookie = (cn) => {
        const cookies = new Cookies();
        cookies.set('cn', `${cn}`, { path: '/' });
        this.setState({
            ck : cn
        })
    }

    componentDidMount(){
        const cookie = new Cookies();
        const cooc = cookie.get('cn');
        axios({
            method : 'GET',
            url : 'http://localhost:4000/users/TT',
            data : null,
            withCredentials: true
        }).then(res => {
            if (res.data.admin === 1) {
            this.setState({
                ten : res.data.ten,
                ck : cooc
            })
            } else {
                this.setState({
                    ten : res.data.result[0].ten,
                    isGV : res.data.result[0].isGV,
                    ck : cooc
                });
            if (res.data.result[0].isGV == false) {
                this.setState({
                    isSV : true
                })
                }
            }
        })

        axios({ 
            method : 'GET',
            url : 'http://localhost:4000/orders/tb',
            data : null,
            withCredentials: true,
          }).then(res => {
            
            res.data.map((item, index) => {
              if(item.ck === 0){
                this.setState({
                  idUser : item.idNhan1,
                  tenDA : item.Topic.tenDoAn,
                })
                axios({ 
                    method : 'POST',
                    url : 'http://localhost:4000/users/Ten',
                    data : {
                      idUser : this.state.idUser
                    }
                  }).then(res => {
                    alert("Gi??o vi??n " + res.data[0].ten + " ???? t??? ch???i tham gia h?????ng d???n ????? ??n " + this.state.tenDA);
                })
  
                axios({
                  method : 'DELETE',
                  url : `http://localhost:4000/orders/${item.id}`,
                  data : null
                }).then(res => {
  
                })
              }
              if(item.ck === 1){
                this.setState({
                  idUser : item.idNhan1,
                  tenDA : item.Topic.tenDoAn,
                })
                axios({ 
                    method : 'POST',
                    url : 'http://localhost:4000/users/Ten',
                    data : {
                      idUser : this.state.idUser
                    }
                  }).then(res => {
                    alert("Gi??o vi??n " + res.data[0].ten + " ???? ?????ng ?? tham gia h?????ng d???n ????? ??n " + this.state.tenDA);
                })
                axios({
                  method : 'DELETE',
                  url : `http://localhost:4000/orders/${item.id}`,
                  data : null
                }).then(res => {
  
                })
              }
            })
          })

        axios({ 
            method : 'GET',
            url : 'http://localhost:4000/orders',
            data : null,
            withCredentials: true,
          }).then(res => {
            if(res.data.length !== 0){
              this.setState({
                o : !this.state.o,
              })
            }
        })
    }


  render() {
    return (
        <div>
            <div class="col-sm-12" style={{textAlign: 'center'}}>
                <img id="imgLogo" style={{maxHeight: '130px', width: '100%'}}  src={Logo} />
            </div>

            {
                this.state.op ? 
                    <Order />
                : ''
            }

            <div class="container-fluid padding">
                <div class="row padding">
                    <div class="col-md-3 col-sx-3 col-sm-3 col-lg-3">
                        <div class="accordion ">
                            <div class="accordion-group khungt">
                                {
                                    (((this.state.ten == 'admin') || this.state.isGV === true))
                                    ?   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                            {this.state.ck === 'Ph???n m???m' ? <button style={{width: '68%', borderRadius: '14px'}} onClick={() => this.onClickSaveCookie('Ph???n m???m')} >PM</button> : <button style={{width: '30%', borderRadius: '14px'}} onClick={() => this.onClickSaveCookie('Ph???n m???m')} >PM</button>}
                                            {this.state.ck === 'M???ng' ? <button style={{width: '68%', marginLeft: '2%', borderRadius: '14px'}} onClick={() => this.onClickSaveCookie('M???ng')} >M</button> : <button style={{width: '30%', marginLeft: '2%',borderRadius: '14px'}} onClick={() => this.onClickSaveCookie('M???ng')} >M</button>}
                                        </div>
                                    :  ''
                                }
                            </div>
                            <div class="accordion-group khungt">
                                {
                                    (((this.state.ten == 'admin')) || (this.state.ten == 'adminPM') || (this.state.ten =='adminM'))  
                                    ?   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                            <Link to={'/QLND'}>Qu???n l?? ng?????i d??ng</Link>
                                        </div>
                                    :  ''
                                }
                            </div>
                            <div class="accordion-group khungt">
                                {
                                    (((this.state.ten == 'admin')) || (this.state.ten == 'adminPM') || (this.state.ten =='adminM'))  
                                    ?   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                            <Link to={'/TaoThongBao'}>T???o th??ng b??o</Link>
                                        </div>
                                    :   <div>
                                        { this.state.isSV 
                                            ? ''
                                            :   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                                    <button style={{fontSize: '15px', border: 'none', backgroundColor: 'rgba(16, 163, 23, 0.9)', color: 'white', fontSize: '20px'}} onClick={this.onClick}>L???i m???i</button>
                                                    {
                                                        this.state.o 
                                                        ? <img style={{width: '15%',float: 'right'}}  src={New} />
                                                        : ''
                                                    }
                                                </div>
                                            }
                                        </div>
                                }
                            </div>
                            <div class="accordion-group khungt">
                                {
                                    (((this.state.ten == 'admin')) || (this.state.ten == 'adminPM') || (this.state.ten =='adminM'))
                                    ?   <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                            <Link to={'/CapNhat'}>T??y ch???n ????? ??n</Link>
                                        </div>
                                    :   <div>
                                        { this.state.isSV 
                                            ? 
                                            <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                                <Link to={'/GVHD'}>Gi???ng vi??n h?????ng d???n</Link>
                                            </div>
                                            : <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                                <Link to={'/Them'}>Th??m ????? ??n</Link>
                                            </div>
                                            }
                                        </div>
                                }
                            <div id="collapse_1" class="accordion-body collapse" >
                                <div class="accordion-inner">
                                </div>
                            </div>
                                </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                        <a href="#">T??i li???u tham kh???o</a>
                                </div>
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                    <p className="xc">Xin ch??o {this.state.ten}</p> 
                                    {/* {this.state.isGV ? 'gi??o vi??n' : 'sinh vi??n'} */}
                                </div>
                            </div>
                            <div class="accordion-group khungt">
                                <div class="accordion-heading stylecolor" style={{padding: '5px'}}>
                                    <Link to='/'>????ng xu???t</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sx-9 col-sm-9 col-md-9 col-lg-9">
                        <div class="divmain">
                            <div class="bgtitle">Lo???i ????? ??n</div>
                            <div className=" col-lg-13 allk ">
                                <div className="khung">
                                    {this.state.isSV
                                        ? <Link to={`DangKyDoAn/${'DACS'}`}><h3>????? ??n c?? s???</h3></Link>
                                        : <Link to={`QuanLyDoAn/${'DACS'}`}><h3>????? ??n c?? s???</h3></Link>
                                    }
                                </div>
                                <div className="khung">
                                    {this.state.isSV
                                        ? <Link to={`DangKyDoAn/${'DACN'}`}><h3>????? ??n chuy??n ng??nh</h3></Link>
                                        : <Link to={`QuanLyDoAn/${'DACN'}`}><h3>????? ??n chuy??n ng??nh</h3></Link>
                                    }
                                </div>
                                <div className="khung">
                                    {this.state.isSV
                                        ? <Link to={`DangKyDoAn/${'DATN'}`}><h3>????? ??n t???t nghi???p</h3></Link>
                                        : <Link to={`QuanLyDoAn/${'DATN'}`}><h3>????? ??n t???t nghi???p</h3></Link>
                                    }
                                </div>
                                <div className="khung">
                                    {this.state.isSV
                                        ? <Link to={`DangKyDoAn/${'KL'}`}><h3>Kh??a lu???n t???t nghi???p</h3></Link>
                                        : <Link to={`QuanLyDoAn/${'KL'}`}><h3>Kh??a lu???n t???t nghi???p</h3></Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container-fluid padding">	
                    <div class="row text-center padding">
                        <div class="col-12">
                            <h2>Contact us</h2>
                        </div>
                        <div className="col-12 social padding">
                            <a href="#"><i className="fab fa-facebook" /></a>
                            <a href="#"><i className="fab fa-twitter" /></a>
                            <a href="#"><i className="fab fa-google-plus-g" /></a>
                            <a href="#"><i className="fab fa-instagram" /></a>
                            <a href="#"><i className="fab fa-youtube" /></a>
                        </div>
                    </div>
                </div>	
                <footer>
                    
                </footer>
            </div>
        </div>
    );
  }
  
}

export default LuaChon;