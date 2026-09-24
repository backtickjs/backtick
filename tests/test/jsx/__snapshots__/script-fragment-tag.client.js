// 17:5
() => {
    return (<div>
          {<Fragment>
              <span>a</span>
              <span>b</span>
            </Fragment>}
          {<>
              <em>c</em>
            </>}
        </div>);
}
