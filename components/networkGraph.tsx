
import React, { RefObject, useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { useD3 } from "../hooks/useD3";

interface NetworkGraphProps {
    nodes: any,
    links: any
}

export default function NetworkGraph({ nodes, links }: NetworkGraphProps) {

    const ref = useD3(
        (svg: any) => {
        svg.selectAll("*").remove();
        const height = 300;
        const width = 300;
        const simulation = d3
            .forceSimulation(nodes)
            .force(
            "link",
            d3
                .forceLink(links)
                .distance(100)
                .id((d: any) => d.id)
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));
        const link = svg
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", 10);

        const node = svg
            .append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 10)
            .attr("class", "node")
            .attr("fill", function (d: any) {
            if (d.label === "Team") return "red";
            else if (d.label === "Stream") return "orange";
            else if (d.label === "Game") return "blue";
            else if (d.label === "Language") return "purple";
            })
            .call(drag(simulation));
    
        var label = svg
            .selectAll(null)
            .data(nodes)
            .enter()
            .append("text")
            .text(function (d: any) {
            return d.name; //return d.label for label
            })
            .style("text-anchor", "middle")
            .style("fill", "red")
            .style("font-family", "Arial")
            .style("font-size", "12px");
    
        simulation.on("tick", () => {
            link
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);
    
            node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
            label
            .attr("x", function (d: any) {
                return d.x;
            })
            .attr("y", function (d: any) {
                return d.y - 15;
            });
        });
    }, nodes.length, links.length)
    
    const refEmpty = useD3((svg: any) => {
        svg.selectAll("*").remove();
        const height = 300;
        const width = 300;
        var g = svg.append("g").attr("transform", function (d: any, i: any) {
        return "translate(0,0)";
        });
        g.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("fill", "#ff7701")
        .attr("font-weight", "50")
        .text("No data available")
        .style("text-anchor", "middle")
        .style("font-family", "Arial")
        .style("font-size", "20px");
    }, nodes.length, links.length);
    
    const drag = (simulation: any) => {
        function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
        }
    
        function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
        }
    
        function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
        }
    
        return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };
    if (nodes.length !== 0) {
        return (
        <svg
            ref={ref}
            style={{
            height: 300,
            width: 300,
            marginRight: "0px",
            marginLeft: "0px",
            }}
        ></svg>
        );
    } else {
        return (
        <svg
            ref={refEmpty}
            style={{
            height: 300,
            width: 300,
            marginRight: "0px",
            marginLeft: "0px",
            }}
        ></svg>
        );
    }
}
    
