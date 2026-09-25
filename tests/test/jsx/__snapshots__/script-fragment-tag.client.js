// 17:5
export default () => {
    return (<div>
          {<Fragment>
              <span>a</span>
              <span>b</span>
            </Fragment>}
          {<>
              <em>c</em>
            </>}
        </div>);
};
