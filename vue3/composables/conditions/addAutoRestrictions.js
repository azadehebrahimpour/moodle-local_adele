// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * add Auto Restrictions module.
 *
 * @package    local_adele
 * @copyright  2023 Wunderbyte GmbH
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


// generate a new id
const  addAutoRestrictions = (newNode, oldNode, relation, store) => {
  if (relation == 'child') {
    // Add restriction to new node.
    newNode.restriction = createRestriction(newNode.id, oldNode.id, store)
    return newNode
  } else if (relation == 'parent') {
    // Add restriction to already exsisting node.
    if (oldNode.restriction != undefined) {
      return oldNode
    } else {
      oldNode.restriction = createRestriction(oldNode.id, newNode.id, store)
    }
    return oldNode
  } else if (relation == 'and') {
    // The new node runs in parallel to the node it was dropped next to and
    // shares that node's successors (#584). Each shared successor gets the
    // new node into its predecessor criterion - exactly what the criterion
    // editor does when an author opens it (parent_courses.vue): every
    // predecessor in courses_id, min_courses left as it is. Its default, here
    // as everywhere in the editor, is 1: any one of the predecessors suffices.
    const criterion = (oldNode.restriction?.nodes || [])
      .find((node) => node?.data?.label === 'parent_courses');
    if (criterion) {
      const ids = criterion.data.value?.courses_id || [];
      if (!ids.includes(newNode.id)) {
        criterion.data.value = { ...criterion.data.value, courses_id: [...ids, newNode.id] };
      }
    } else if (!oldNode.restriction?.nodes?.length) {
      // No criterion yet: create one naming the existing predecessors and the
      // new node.
      oldNode.restriction = createRestriction(oldNode.id, newNode.id, store);
      const created = oldNode.restriction.nodes
        .find((node) => node?.data?.label === 'parent_courses');
      const parents = (oldNode.parentCourse || [])
        .filter((id) => id !== 'starting_node' && id !== newNode.id);
      created.data.value.courses_id = [...parents, newNode.id];
    }
    return oldNode
  }
  return null
}

function createRestriction (node_id, parent_node_id, store) {

  return {
    "edges": [
      {
        "data": {},
        "deletable": false,
        "events": {},
        "id": "condition_1-condition_feedback",
        "source": "condition_1",
        "sourceHandle": "target_and",
        "sourceX": 858,
        "sourceY": 241,
        "target": "condition_1_feedback",
        "targetHandle": "source_feedback",
        "targetX": 858,
        "targetY": 199,
        "type": "default"
      }
    ],
    "nodes": [
      {
        "childCondition": ['condition_1_feedback'],
        "data": {
          "description": store.state.strings.course_description_condition_parent_courses,
          "description_before": store.state.strings.course_restricition_before_condition_parent_courses,
          "id": 150,
          "label": "parent_courses",
          "information" : store.state.strings.course_information_condition_parent_courses,
          "name": store.state.strings.course_name_condition_parent_courses,
          "node_id": 'condition_1',
          "value": {
            "courses_id": [parent_node_id],
            "min_courses" : 1
          },
          "visibility": true
        },
        "draggable": false,
        "deletable": false,
        "events": {},
        "id": 'condition_1',
        "label": "custom node",
        "parentCondition": [
          "starting_condition"
        ],
        "position": {
          "x": 683,
          "y": 247.5
        },
        "type": "custom"
      },
      {
        "data": {
          "childCondition": 'condition_1',
          "visibility": true,
          "feedback_before": store.state.strings.course_restricition_before_condition_parent_courses,
          "feedback_before_checkmark": true,
          "information": store.state.strings.course_information_condition_parent_courses,
        },
        "draggable": false,
        "deletable": false,
        "events": {},
        "id": "condition_1_feedback",
        "label": store.state.strings.composables_feedback_node,
        "position": {
          "x": 683,
          "y": -100
        },
        "type": "feedback"
      }
    ],
    "position": [
      0,
      0
    ],
    "viewport": {
      "x": 0,
      "y": 0,
      "zoom": 1
    },
    "zoom": 1
  }
}

export default addAutoRestrictions;