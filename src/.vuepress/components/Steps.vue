<template>
	<div class="steps">
		<slot></slot>
	</div>
</template>


<script>
	export default {

	}
</script>


<style lang="scss" scoped>
	$lineColor: #AAA;
	.steps {
		background: #e6e6f3;
    padding: 10px;
    padding-bottom: 0;
    border-radius: 5px;
		/deep/ > step {
	    display: inline-block;
	    border: solid 1px $lineColor;
	    line-height: 3em;
	    border-radius: 5px;
	    margin-bottom: 10px;
	    padding: 0 10px;
		}
		/deep/ > node-action {
			position: relative;
	    display: inline-block;
			border-bottom: solid 1px $lineColor;
			padding: 0 10px;
			line-height: 1.5em;
			&:after {
				content: '';
				width: 8px;
				height: 8px;
				display: inline-block;
				border-top: solid 1px $lineColor;
				border-right: solid 1px $lineColor;
				transform: rotate(45deg);
				position: absolute;
				bottom: -5px;
				right: 1px;
			}
		}
		> * {
			display: none;
		}
	}
</style>
