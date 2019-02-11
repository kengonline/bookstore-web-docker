import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

// Services
import { addRouter } from 'src/services/router.service'

// Components
import Layout from 'src/components/layout/Layout';

class UnauthorizePage extends Component {
    static configRoute() {
        return {
            path: '/unauthorize'
        };
    }

    render() {
        return (
            <Layout {...this.props} style={{ backgroundColor: 'white' }}>
                <div style={{ marginTop: '15vh', textAlign: 'center' }}>
                    <Row>
                        <Col style={{ display: 'inline-flex' }}>
                            <div style={{ fontSize: 50, fontWeight: 'bold', paddingTop: 100, color: '#007fff' }}>
                                Uh, oh..! 403
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div style={{ fontSize: 40, fontWeight: 'bold', color: '#6ab4fe', paddingTop: 15 }}>
                            You do not have permission to view this resource.
                        </div>
                    </Row>
                    <Row style={{ paddingTop: 15 }}>
                        <Button
                            ghost
                            type="primary"
                            size="large"
                            style={{ fontSize: 25, fontWeight: 'bold' }}
                            onClick={() => window.close()}
                        >
                            Close
                        </Button>
                    </Row>
                </div>
            </Layout>
        );
    }
}

export default addRouter(UnauthorizePage);