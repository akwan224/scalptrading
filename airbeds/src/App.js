import React, { Component } from "react";
import {
  ReactiveBase,
  DataSearch,
  NumberBox,
  DateRange,
  RangeSlider
} from "@appbaseio/reactivesearch";
import { ReactiveGoogleMap } from "@appbaseio/reactivemaps";
import "./App.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from 'react-avatar';

class App extends Component {
  onPopoverClick = function(data) {
    return (
      <div className="popover">
        <div className="image-container">
          <img src={data.image} alt={data.name} height="185" width="263" />
        </div>
        <div className="extra-info-container">
          <div className="type-container info">
            {data.room_type}-{data.beds} bed
          </div>
          <div className="name-container info">{data.name}</div>
          <div className="price-container info">
            ${data.price} per night-Free cancellation
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="main-container">
        <ReactiveBase
        //  Seattle version
          // app="airbeds-test-app"
          // credentials="X8RsOu0Lp:9b4fe1a4-58c6-4089-a042-505d86d9da30"
          // type="listing"

          // HK version
          app="hello12345678"
          credentials="qMa9ytWNx:f3d2d1c4-b834-43ce-85b2-8d73980189bd"
          type="hello12345678"
          theme={{
            colors: {
              primaryColor: "#41ABF5"
            }
          }}
        >
          <div className="nav-container">
            <nav className="nav">
              <div className="title">homely</div>
              {/* <form> */}
              {/* <div className="search-container"> */}
              <DataSearch
                componentId="search"
                dataField="name"
                autosuggest={false}
                placeholder="Search housings..."
                iconPosition="left"
                className="search"
              //   innerClass={{
              //     title: 'search-title',
              //     input: 'search-input',
              //     icon: 'plain'
              // }}
              // className="search-field"
              />
            {/* </div> */}
{/* <img src ="https://hackernoon.com/hn-images/1*u90cJ3k-ZXvLlgWg1apBEg.png" width = "40"  height = "40" style = {{position: 'absolute', right: 150}}  alt="Ether logo"></img> */}
          {/* </form> */}
            </nav>
          </div>
          <div className="filters-search-container">
            <div className="filter-container">
              <div className="dropdown">
                <button className="button">Price</button>
                <div className="dropdown-content">
                  <RangeSlider
                    componentId="PriceSensor"
                    dataField="price"
                    title="Price Range"
                    range={{
                      start: 10,
                      end: 100000
                    }}
                    rangeLabels={{
                      start: "$100",
                      end: "$100000"
                    }}
                    defaultValue={{
                      start: 10,
                      end: 50
                    }}
                    stepValue={10}
                    interval={20}
                    react={{
                      and: ["DateRangeSensor", "GuestSensor"]
                    }}
                    className="rangeFilter"
                  />
                </div>
              </div>
              <div className="dropdown">
                <button className="button">Guests</button>
                <div className="dropdown-content-guest">
                  <NumberBox
                    componentId="GuestSensor"
                    dataField="accommodates"
                    title="Guests"
                    defaultValue={2}
                    labelPosition="right"
                    data={{
                      start: 1,
                      end: 16
                    }}
                    className="numberFilter"
                  />
                </div>
              </div>
              <div className="dropdown">
                <button className="button">Bedrooms</button>
                <div className="dropdown-content-guest">
                  <NumberBox
                    componentId="BedRoomSensor"
                    dataField="bedrooms"
                    title="Bedrooms"
                    defaultValue={1}
                    labelPosition="right"
                    data={{
                      start: 1,
                      end: 16
                    }}
                    className="numberFilter"
                  />
                </div>
              </div>

              <div className="dropdown">
                <button className="button ">When</button>
                <div className="dropdown-content">
                  <DateRange
                    dataField="date_from"
                    componentId="DateRangeSensor"
                    title="When"
                    numberOfMonths={2}
                    queryFormat="basic_date"
                    initialMonth={new Date("04/01/2017")}
                    className="dateFilter"
                  />
                </div>
              </div>
            </div>
            {/* <div className="search-container">
              <DataSearch
                componentId="search"
                dataField="name"
                autosuggest={false}
                placeholder="Search housings..."
                iconPosition="left"
                className="search"
              />
            </div> */}
          </div>
          
          <div className="result-map-container">
            <ReactiveGoogleMap
              componentId="map"
              dataField="location"
              defaultZoom={13}
              pagination
              onPageChange={() => {
                window.scrollTo(0, 0);
              }}
              // style={{
              //   width: "calc(100% - 280px)",
              //   height: "calc(100vh - 52px)"
              // }}
              style={{
                width: "calc(100%)",
                height: "calc(100vh)"
              }}
              onPopoverClick={this.onPopoverClick}
              className="rightCol"
              showMarkerClusters={false}
              showSearchAsMove={false}
              innerClass={{
                label: "label"
              }}
              renderAllData={(
                hits,
                streamHits,
                loadMore,
                renderMap,
                renderPagination
              ) => (
                <div style={{ display: "flex" }}>
                  <div>
                    <div className="card-container">
                      
                      {hits.map(data => (
                        <div key={data._id} className="card">
                          <div
                            className="card__image"
                            style={{ backgroundImage: `url(${data.image})` }}
                            alt={data.name}
                          />
                          <div>
                            <br></br>
                            <h7>{data.name}</h7>
                            <div className="card__price">{data.price}</div>
                            <p className="card__info">
                              {data.room_type} · {data.accommodates} guests
                            </p>
                            <br></br>
                          </div>
                          <a href = ""> </a>
                        </div>
                      ))}
                    </div>
                    <div>{renderPagination()}</div>
                  </div>
                  <div className="map-container">{renderMap()}</div>
                </div>
              )}
              renderData={data => ({
                label: (
                  <div
                    className="marker"
                    style={{
                      width: 40,
                      display: "block",
                      textAlign: "center"
                    }}
                  >
                    <div className="extra-info">{data.name}</div>${data.price}
                  </div>
                )
              })}
              react={{
                and: ["GuestSensor", "BedRoomSensor", "PriceSensor", "DateRangeSensor", "search"]
              }}
            />
          </div>
        </ReactiveBase>
      </div>
      
    );
  }
}

export default App;